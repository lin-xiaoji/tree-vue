<template>
    <div class="header">
        <a @click="saveData" class="fr mr_20 btn" >
            保存
        </a>

        <!--登录之前-->
        <span v-if="!username">
        <a id="btn-login" class="header-item tc fl ml_10" @click="loginModal = true" >
             登录
        </a>
        <a id="btn-reg" class="header-item tc fl " @click="RegModal = true">
             注册
         </a>
         </span>
        <!--登录之后-->
        <div class="login" v-if="username">
            <Icon type="android-person" size="18"></Icon> <span class="font_14 account">{{username}}</span>
        </div>

        <span class="tc font_16" v-if="!fileName">加载中...</span>
        <span class="tc font_16" v-if="fileName">{{fileName}}</span>

        <Modal
            v-model="loginModal"
            title="登陆"
            width="400"
            :footer-hide="true"
            >
            <Login></Login>
        </Modal>

        <Modal
                v-model="RegModal"
                title="注册"
                width="400"
                :footer-hide="true"
        >
            <Reg></Reg>
        </Modal>

    </div>
</template>
<script>
    import Api from '../utils/Api'
    import Login from './Login.vue'
    import Reg from './Reg.vue'
    export default {
        data () {
            return {
                loginModal: false,
                RegModal: false,
            }
        },
        computed: {
            fileName() {
                document.title = this.$store.state.treeData.name + ' 知识树';
                return this.$store.state.treeData.name
            },
            username() {
                return this.$store.state.username
            }
        },
        methods: {
            saveData() {
                //清除递归引用
                let treeData = this.$store.state.treeData;
                function delParent(data) {
                    delete data.parent;
                    if(data.sub) {
                        data.sub.map(function (item) {
                            delParent(item);
                        });
                    }
                }
                delParent(treeData);

                let content = JSON.stringify(treeData);
                this.$store.commit('setTreeData',treeData); //还原数据，

                let id = this.$store.state.currentFileId;
                Api.post('files/save',{id:id,content:content},()=>{
                    this.$Message.success('保存成功');
                });
            }
        },

        mounted() {
            //ctrl+s保存
            let that = this;
            document.onkeydown = function(e){
                if( e.ctrlKey  == true && e.keyCode == 83 ){
                    that.saveData();
                    return false; // 截取返回false就不会保存网页了
                }
            };
        },
        components: {
            Login,
            Reg
        }
    }
</script>