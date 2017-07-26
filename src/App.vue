<template>
    <div id="root" :style="{height:height + 'px'}" @click="closeProperty">
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
    methods: {
        //关闭所有属性列表
        closeProperty(e) {
            if(e.target.id == 'svg-box') {
                this.$store.commit('setShowPropertyKey','');
                this.$store.commit('setDetailShow',false);
            }
        }
    },
    components: {
        TopBar,
        LeftBar,
        Tree,
    }
}
</script>