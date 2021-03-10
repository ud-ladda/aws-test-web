<template>
  <div>
    <v-bottom-sheet
      ref="sheet"
      inset
      :value="activeDialog && uploadList.length > 0"
      hide-overlay
      :retain-focus="false"
      persistent
      no-click-animation
    >
      <div class="upload-panel">
        <v-expansion-panels v-model="panel">
          <v-expansion-panel>
            <v-expansion-panel-header
              v-if="uploadDone"
              expand-icon="mdi-close"
              @click="close()"
              >{{ title }}</v-expansion-panel-header
            >
            <v-expansion-panel-header v-else expand-icon="mdi-menu-up">{{
              title
            }}</v-expansion-panel-header>
            <v-expansion-panel-content class="px-0">
              <v-list class="px-0 py-0">
                <v-list-item
                  v-for="(item, i) in uploadList"
                  :key="i"
                  class="px-0 py-0"
                >
                  <v-col class="form-icon" cols="1">
                    <v-icon v-if="item.fileType === 'video'"
                      >mdi-play-circle-outline</v-icon
                    >
                  </v-col>
                  <v-col class="file-name" cols="7">
                    <div class="wrap-text">{{ getDisplayFileName(item) }}</div>
                    <span
                      v-if="!item.uploadSuccess && !item.isUploading"
                      class="txt-error"
                      >(Failed)</span
                    >
                  </v-col>
                  <!-- <v-col cols="3" class="pr-0">{{`(${item.fileSize})`}}</v-col> -->
                  <v-col style="text-align: right">
                    <v-icon
                      v-if="!item.uploadSuccess && !item.isUploading"
                      size="32"
                      class="retry-icon"
                      @click="retryUpload(item)"
                      >mdi-refresh</v-icon
                    >
                    <v-progress-circular
                      v-if="item.isUploading"
                      style="align-self: center"
                      :value="item.uploadProgress"
                    ></v-progress-circular>
                    <v-icon
                      v-if="
                        item.uploadProgress === 100 &&
                        item.uploadSuccess &&
                        !item.isUploading
                      "
                      size="32"
                      class="check-icon"
                      >mdi-check</v-icon
                    >
                  </v-col>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-bottom-sheet>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {},
  data() {
    return {
      panel: 0,
      uploadDone: false,
      uploadList: [],
      title: '',
      UPLOADING: 'กำลังอัพโหลด...',
      cancelSource: [],
    }
  },
  computed: {
    activeDialog() {
      return this.$store.getters['shared/uploadPanel/getActiveStatus']
    },
  },
  created() {
    this.title = this.UPLOADING
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (
        mutation.type === 'shared/uploadPanel/SET_ACTIVE_STATUS' &&
        this.$store.getters['shared/uploadPanel/getActiveStatus'] &&
        this.$store.getters['shared/uploadPanel/getUploadList']?.length > 0
      ) {
        this.uploadList = this.$store.getters[
          'shared/uploadPanel/getUploadList'
        ]
        this.$store.dispatch('shared/uploadPanel/setUploadList', null)
        this.mapUploadList()
        this.upload()
      }
    })
  },
  beforeDestroy() {
    this.unsubscribe()
    this.$store.dispatch('shared/uploadPanel/setActiveStatus', false)
    this.$store.dispatch('shared/uploadPanel/setIsUploadDone', true)
  },
  methods: {
    close() {
      this.$store.dispatch('shared/uploadPanel/setActiveStatus', false)
      this.$store.dispatch('shared/uploadPanel/setIsUploadDone', true)
    },
    async upload(file) {
      this.cancelSource = []
      this.uploadDone = false
      this.title = this.UPLOADING
      const retryFile = []
      this.$store.dispatch('shared/uploadPanel/setIsUploadDone', false)
      try {
        if (file) {
          const { data } = await this.$axios.post(this.$apis.signedUrlUpload, {
            fileList: [
              {
                fileName: file.fileName,
                fileType: file.fileType,
                keyPath: file.keyPath,
              },
            ],
          })
          retryFile.push({ ...file, fileName: data[0].file })
        }
      } catch (err) {
        console.log(err)
      }
      this.$store.dispatch('shared/uploadPanel/setActiveStatus', true)
      this.panel = 0
      const uploadPromise = []
      try {
        if (file) {
          uploadPromise.push(this.prepareUpload(retryFile[0], true))
        } else {
          for (const file of this.uploadList) {
            uploadPromise.push(this.prepareUpload(file))
          }
        }
        this.$store.dispatch(
          'shared/uploadPanel/setRequestCancelSource',
          this.cancelSource
        )
        Promise.allSettled(uploadPromise).then(() => {
          let successFile = 0
          this.uploadList.forEach((file) => {
            if (file.uploadSuccess) {
              successFile += 1
            }
          })
          this.title = `อัพโหลดสำเร็จ ${successFile} ไฟล์`
          this.uploadDone = true
          this.$store.dispatch('shared/uploadPanel/setIsUploadDone', true)
          this.panel = 0
          this.$emit('onFinishUpload')
        })
      } catch (err) {
        console.log(err)
      }
    },
    getFileName(file) {
      return file.substring(file.lastIndexOf('/') + 1)
    },
    getDisplayFileName(file) {
      return file.displayName ? file.displayName : file.fileName
    },
    mapUploadList() {
      const mapUploadList = []
      this.uploadList.forEach((element) => {
        mapUploadList.push({
          ...element,
          fileType: element.fileType,
          isUploading: true,
          uploadSuccess: false,
          uploadProgress: 0,
        })
      })
      this.uploadList = mapUploadList
    },
    retryUpload(file) {
      this.upload(file)
    },
    prepareUpload(file, isRetry) {
      if (isRetry) {
        this.uploadList.forEach((element, index) => {
          if (file.fileName === element.fileName) {
            this.uploadList[index].uploadProgress = 0
            this.uploadList[index].isUploading = true
          }
        })
      }
      let fileIndex = null
      const uploadProgress = (file) => (progress) => {
        const percentage = Math.floor((progress.loaded * 100) / progress.total)
        fileIndex = this.uploadList.findIndex((element) => {
          return element.fileName === file
        })
        this.uploadList[fileIndex].uploadProgress = percentage
      }
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      const config = {
        onUploadProgress: uploadProgress(file.fileName),
        headers: { 'Content-Type': file.file.type },
        cancelToken: source.token,
      }
      this.cancelSource.push(source)
      return axios
        .put(file.uploadUrl, file.file, config)
        .then((response) => {
          if (response.status === this.$enum.httpStatus.OK) {
            if (this.uploadList[fileIndex].uploadProgress === 100) {
              this.emitFile(response, file.fileName)
              this.uploadList[fileIndex].uploadSuccess = true
            } else {
              this.uploadList[fileIndex].uploadSuccess = false
            }
            this.uploadList[fileIndex].isUploading = false
          } else {
            this.uploadList[fileIndex].uploadSuccess = false
            this.uploadList[fileIndex].isUploading = false
          }
          return response
        })
        .catch(() => {
          this.uploadList[fileIndex].uploadSuccess = false
          this.uploadList[fileIndex].isUploading = false
        })
    },
    emitFile(response, fileName) {
      const result = []
      if (
        response?.config?.url &&
        response?.status === this.$enum.httpStatus.OK
      ) {
        const url = new URL(response?.config?.url)
        result.push({
          fileName,
          location: `${url.origin}${url.pathname}`,
        })
      }
      this.$emit('onUploadFileFinish', result)
      this.$emit('onRefresh')
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-panel {
  background: white !important;
}
.list-item {
  background: red;
}
.form-icon {
  align-self: center;
}
.check-icon {
  color: teal;
}
.retry-icon {
  color: dark;
}
.txt-error {
  padding-left: 10px;
  color: red;
}
.file-name {
  align-self: center;
  display: flex;
}
</style>
