<template>
    <div id="file-list" class="file-list">
        <ul>
            <li v-for="item in fileList" @click="showFile(item.id)"><a :class="{special:(item.id == currentFileId)}"><Icon type="document"></Icon>{{item.name}}</a></li>
        </ul>
        <div class="add-file">添加文档</div>
    </div>
</template>
<script>
    export default {
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