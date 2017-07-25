<template>
    <div id="root" :style="{height:height + 'px'}">
        <TopBar></TopBar>
        <LeftBar></LeftBar>
        <Tree></Tree>
    </div>
</template>

<script>
import Api from './utils/Api'
import TopBar from './components/TopBar.vue'
import LeftBar from './components/LeftBar.vue'
import Tree from './components/tree/Tree.vue'

export default {
    data() {
        return {
            height: window.innerHeight
          }
    },
    mounted() {
        this.$store.dispatch('getTreeData');
        let that = this;
        window.onresize = function () {
            that.height = window.innerHeight;
        };

    },
    components: {
        TopBar,
        LeftBar,
        Tree,
    }
}
</script>