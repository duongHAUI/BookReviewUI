<template>
  <div class="admin-main">
    <div class="admin-slide-bar">
      <h4>Kiểm duyệt</h4>

      <ul class="tab-search">
        <li
          class="tab-search-item"
          :class="{ active: tabActive == 'Review' }"
          @click="activeTab('Review')"
        >
          Bài viết
        </li>
        <li
          class="tab-search-item"
          :class="{ active: tabActive == 'Book' }"
          @click="activeTab('Book')"
        >
          Sách
        </li>
        <li
          class="tab-search-item"
          :class="{ active: tabActive == 'Author' }"
          @click="activeTab('Author')"
        >
          Tác giả
        </li>
      </ul>
      <div class="search-type-header">
        <div class="t-search-input">
          <m-input :placeholder="placeholder" v-model="textSearch" />
        </div>
      </div>
      <div class="">
        <div class="m-t-16">
          <MCombobox
            :data="listStatus"
            v-model="status"
            propName="value"
            propValue="id"
            icon="icon-drop-page-black"
            :locationList="0"
            :isReadonly="true"
            @selected="(state) => (status = state)"
          />
        </div>
        <div class="m-t-16 sort-direction">
          <m-radio-button
            id="ASC"
            :checked="true"
            textField="Giảm theo thời gian tạo"
            nameInput="SortDirection"
          />
          <div class="m-t-8"></div>
          <m-radio-button id="DESC" textField="Tăng theo thời gian tạo" nameInput="SortDirection" />
        </div>
      </div>

      <div class="m-t-12" style="width: 100%">
        <m-button width="100%" @click="searchData">Lọc</m-button>
      </div>
    </div>
    <div class="admin-container">
      <div class="m-f-bw">
        <div class="flex">
          <m-check-box
            :checked="isApproved"
            id="isApproved"
            @checkbox-selected="checkBoxSelected"
          />
          <div style="margin-left: 8px">Danh sách đã duyệt</div>
        </div>
        <div
          class="content-table__refesh icon-refesh"
          @click="refresh()"
          data-tip="Lấy lại dữ liệu"
        ></div>
      </div>
      <div class="m-t-12"></div>
      <div>
        <div class="my-book-info">
          <MTable
            :rows="rows"
            :columns="columns"
            v-model="rowsSelected"
            :isLoadding="$state.isLoadding"
            @refresh="refresh()"
            @selectedItem="selectedItemStatus"
          />
          <div class="content-navigation">
            <div class="content-navigation__total">
              Tổng số: <span>{{ rows.length || 0 }}</span> bản ghi
            </div>
            <div class="content-navigation__page">
              <div>
                <MCombobox
                  :data="listPaginate"
                  v-model="pageSize"
                  propName="value"
                  propValue="id"
                  icon="icon-drop-page-black"
                  :locationList="1"
                  :isReadonly="true"
                  @update:modelValue="changePageSizePaginate"
                />
              </div>
              <MPaginate :pageCount="totalPageNumber" @change="eventHandlePaginate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import constants from '@/common/constants'
import enumD from '@/common/enum'
import MButton from '@/components/button/MButton.vue'
import MCombobox from '@/components/combobox/MCombobox.vue'
import MInput from '@/components/input/MInput.vue'
import MRadioButton from '@/components/radio-button/MRadioButton.vue'
import config from '@/config'
import MTable from '@/components/table/MTable.vue'
import reviewPostApi from '@/api/reviewPostApi'
import bookApi from '@/api/bookApi'
import MCheckBox from '@/components/checkbox/MCheckBox.vue'
export default {
  components: {
    MInput,
    MButton,
    MCombobox,
    MRadioButton,
    MTable,
    MCheckBox
  },
  data() {
    return {
      placeholder: 'Tìm kiếm',
      valueSearch: '',
      typeSearch: enumD.TypeSearch.Book,
      tabActive: 'Review',
      pageSize: 20,
      pageNumber: 1,
      textSearch: '',
      listBook: [],
      listAuthor: [],
      listFriend: [],
      enumerate: enumD,
      listTypeBook: constants.listTypeBook.filter((x) => x.id != '-1'),
      listStatus: constants.Status.filter((x) => x.id),
      status: -1,
      SortDirection: 'DESC',
      columns: new config().columnReview,
      listPaginate: constants.listNavigateNumber,
      rows: [],
      isApproved: false
    }
  },
  computed: {
    parameter() {
      return {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        textSearch: this.textSearch,
        sortDirection: this.SortDirection,
        status: this.isApproved ? 2 : this.status
      }
    },
    /**
     * Tính tổng số trang
     */
    totalPageNumber() {
      return Math.ceil(this.totalRecord / this.pageSize)
    }
  },
  async created() {
    await this.getDataAdmin()
  },
  methods: {
    async activeTab(tab) {
      this.tabActive = tab
      await this.refresh()
      if (this.tabActive == 'Review') {
        this.columns = new config().columnReview
      } else {
        this.columns = new config().columnBook
      }
    },
    /**
     * Bắt sự kiện thay đổi trang
     */
    async eventHandlePaginate(pageNumber) {
      this.$state.isMask()
      this.pageNumber = pageNumber
      setTimeout(async () => {
        await this.getData()
      }, 500) // delay
    },
    changePageSizePaginate() {
      this.$state.isMask()
      setTimeout(async () => {
        await this.getData()
      }, 500) // delay
    },
    async getDataAdmin() {
      try {
        let res
        this.$state.isMask()
        if (this.tabActive == 'Review') {
          res = await new reviewPostApi(this.tabActive).adminReview(this.parameter)
        } else if (this.tabActive == 'Book') {
          res = await new bookApi().adminBook(this.parameter)
        }
        if (res && res.Data) {
          this.rows = res.Data
          this.totalRecord = res.Total
        }
      } catch (error) {
        console.log(error)
      }
      this.$state.unMask()
    },
    async refresh() {
      this.pageNumber = 1
      await this.getDataAdmin()
    },
    async selectedItemStatus(value, data, type) {
      if (type == 'statusReview') {
        await new reviewPostApi().UpdateStatus({
          review_id: data.review_id,
          status: value
        })
      } else if (type == 'statusBook') {
        await new bookApi('Book').UpdateStatus({
          book_id: data.book_id,
          status: value
        })
      }
      await this.refresh()
    },
    async searchData() {
      await this.refresh()
    },
    checkBoxSelected(value) {
      this.isApproved = value
    }
  }
}
</script>

<style scoped>
@import url(./admin.css);
</style>
