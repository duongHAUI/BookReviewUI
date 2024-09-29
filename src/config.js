class config {
  constructor() {
    this.communityDownList = [
      {
        href: '/1',
        text: 'Nhóm'
      },
      {
        href: '/2',
        text: 'Thảo luận'
      },
      {
        href: '/3',
        text: 'Trích dẫn'
      },
      {
        href: '/4',
        text: 'Hỏi tác giả'
      },
      {
        href: '/5',
        text: 'Người dùng'
      }
    ]
    this.profileDownList = [
      {
        isTitle: true,
        text: 'Thông tin'
      },
      {
        href: '/profile',
        text: 'Hồ sơ'
      },
      {
        href: '/friends',
        text: 'Bạn bè'
      },
      {
        href: '/groups',
        text: 'Nhóm'
      },
      {
        isHr: true
      },
      {
        href: '/account',
        text: 'Tài khoản'
      },
      {
        href: '/help',
        text: 'Hỗ trợ'
      },
      {
        href: '/sign_in',
        text: 'Đăng xuất',
        key: 'logout'
      }
    ]
    this.columnsTableMyBook = [
      {
        name: 'cover_image',
        title: 'ảnh sách',
        textAlign: 'left',
        type: 'image',
        width: 80
      },
      {
        name: 'book_name',
        title: 'Tên sách',
        textAlign: 'left',
        type: 'text',
        width: 150
      },
      {
        name: 'author_name',
        title: 'Tác giả',
        textAlign: 'left',
        type: 'text',
        width: 150
      },
      {
        name: 'avg_rate',
        title: 'Đánh giá',
        textAlign: 'center',
        type: 'review-start',
        width: 150
      },
      {
        name: 'list_type',
        title: 'Trạng thái',
        textAlign: 'center',
        type: 'status',
        width: 90
      },
      {
        name: 'publication_date',
        title: 'Ngày xuất bản',
        textAlign: 'center',
        type: 'date',
        width: 100
      }
    ]
    ;(this.columnReview = [
      {
        name: 'image_user_post',
        title: 'Người đăng',
        textAlign: 'left',
        type: 'image',
        width: 80
      },
      {
        name: 'fullname',
        title: 'Tên người đăng',
        textAlign: 'left',
        type: 'text',
        width: 120
      },
      {
        name: 'review_text',
        title: 'Diễn giải',
        textAlign: 'left',
        type: 'description',
        width: 250,
        drilldown: true
      },
      {
        name: 'book_name',
        title: 'Tên sách',
        textAlign: 'left',
        type: 'text',
        width: 100
      },
      {
        name: 'author_name',
        title: 'Tác giả',
        textAlign: 'center',
        type: 'text',
        width: 150
      },
      {
        name: 'status',
        title: 'Trạng thái',
        textAlign: 'center',
        type: 'statusReview',
        width: 150
        // fixedRight: true
      }
    ]),
      (this.columnBook = [
        {
          name: 'cover_image',
          title: 'ảnh sách',
          textAlign: 'left',
          type: 'image',
          width: 80
        },
        {
          name: 'fullname',
          title: 'Người đăng',
          textAlign: 'left',
          type: 'text',
          width: 150
        },
        {
          name: 'book_name',
          title: 'Tên sách',
          textAlign: 'left',
          type: 'text',
          width: 150
        },
        {
          name: 'author_name',
          title: 'Tác giả',
          textAlign: 'left',
          type: 'text',
          width: 150
        },
        {
          name: 'publication_date',
          title: 'Ngày xuất bản',
          textAlign: 'center',
          type: 'date',
          width: 100
        },
        {
          name: 'status',
          title: 'Trạng thái',
          textAlign: 'center',
          type: 'statusBook',
          width: 150
          // fixedRight: true
        }
      ])
  }
}
export default config
