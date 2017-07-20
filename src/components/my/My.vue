<template>
  <div>
    <flexbox orient="vertical" :gutter="15">
      <!-- 头像关注等信息 -->
      <flexbox-item style="background-color: white; padding-bottom: 10px; border-width: 1px 0; border-style: solid; border-color: #dfdfdf">
        <flexbox orient="vertical" :gutter="0">
          <!-- 头像 -->
          <flexbox-item>
            <flexbox orient="vertical" :gutter="0" @click.native="toEditInfo">
              <flexbox-item style="text-align: center">
                <img :src="headimg_full_url" style="height: 70px; width: 70px;border-radius: 50%; margin: 10px auto 5px auto;vertical-align: middle;">
              </flexbox-item>
              <flexbox-item style="text-align: center">
                <div>
                  <span style="color: #999999;font-size: 14px;">编辑资料</span>
                </div>
                <div style="border-bottom:1px solid #62cc74;width: 20px;margin: 4px auto 14px auto"></div>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
          <!-- 动态关注粉丝 -->
          <flexbox-item>
            <flexbox>
              <!-- 动态 -->
              <flexbox-item>
                <flexbox orient="vertical" :gutter="0">
                  <flexbox-item>
                    <div style="text-align: center">
                      <span style="font-size: 14px">1</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center">
                      <span style="font-size: 14px;color: #999999">动态</span>
                    </div>
                  </flexbox-item>
                </flexbox>
              </flexbox-item>
              <!-- 关注 -->
              <flexbox-item>
                <flexbox orient="vertical" :gutter="0">
                  <flexbox-item>
                    <div style="text-align: center">
                      <span style="font-size: 14px">2</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center">
                      <span style="font-size: 14px;color: #999999">关注</span>
                    </div>
                  </flexbox-item>

                </flexbox>
              </flexbox-item>
              <!-- 粉丝 -->
              <flexbox-item>
                <flexbox orient="vertical" :gutter="0">
                  <flexbox-item>
                    <div style="text-align: center">
                      <span style="font-size: 14px">0</span>
                    </div>
                  </flexbox-item>
                  <flexbox-item>
                    <div style="text-align: center">
                      <span style="font-size: 14px;color: #999999">粉丝</span>
                    </div>
                  </flexbox-item>

                </flexbox>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  import Flexbox from '../../../node_modules/vux/src/components/flexbox/flexbox'
  import FlexboxItem from '../../../node_modules/vux/src/components/flexbox/flexbox-item'
  export default {
    components: {
      FlexboxItem,
      Flexbox
    },
    data () {
      return {
      }
    },
    mounted () {
      /* 修改当前页面标题 */
      this.changePageTitle(this.pageTitle)
    },
    methods: {
      ...mapActions([
        'changePageTitle'
      ]),
      toEditInfo () {
        this.$router.push('editInfo')
      }
    },
    computed: {
      ...mapState({
        pageTitle: (state) => state.user.selfInfo.name,
        headimg_full_url: (state) => state.user.selfInfo.headimg_full_url || '/static/img/headimg/default.jpg'
      })
    }
  }
</script>
