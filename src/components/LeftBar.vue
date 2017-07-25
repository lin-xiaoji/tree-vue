<template>
    <div class="file-list">
        <ul>
            <li v-for="item in fileList" @click="showFile(item.id)"><a :class="{special:(item.id == currentFileId)}"><Icon type="document"></Icon>{{item.name}}</a></li>
        </ul>
        <div class="add-file" @click="modal = true">添加文档</div>
        <Modal
                v-model="modal"
                title="添加文档"
                width="400"
                :footer-hide="true"
        >
            <Form ref="formInline" >
                <Form-item prop="username">
                    <Input type="text" placeholder="请输入文档名称"/>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('formInline')" long>添加</Button>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                modal:false
            }
        },
        computed: {
            fileList() {
                return this.$store.state.fileList
            },
            currentFileId() {
                return this.$store.state.currentFileId
            }
        },
        methods: {
            showFile(id) {
                this.$store.commit('setCurrentFileId',id);
                this.$store.dispatch('getTreeData');
            },
            addFile() {

            }
        },
        mounted() {
            this.$store.dispatch('getFileList');
        }
    }
</script>