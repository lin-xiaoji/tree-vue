import Vue from 'vue'
import Api from '../utils/Api'
import Vuex from 'vuex'
Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        username:'',

        currentFileId:1,
        fileList:[],
        treeData:{},
        currentNode:{},
        showPropertyKey:'',

        detailIsShow:false,
        detailIsEdit:false,
        detailData:{},
    },
    mutations: {
        setUsername(state, username) {
            state.username = username;
        },

        setTreeData(state,treeData) {

            function countNodePos(treeData) {
                var level = 0;
                var levelArr = {};
                //计算每个节点的高度
                function getNodeHeight(node,parentNode) {
                    var height = 100;
                    if(node.sub) {
                        level ++;
                        for(var i=0; i<node.sub.length; i++ ) {
                            var thisNodeHeight = getNodeHeight(node.sub[i],node);
                            height = height + thisNodeHeight;
                        }
                        level --;
                        height = height - 100;
                    }
                    node.parent = parentNode;
                    node.level = level;
                    node.height = height;


                    //生成二维数组层级树，用于后面计算pos的值
                    if(levelArr[level] == undefined) {
                        levelArr[level] = [];
                    }
                    levelArr[level].push(node);
                    return height;
                }
                getNodeHeight(treeData);


                //计算每个节点的位置
                function getNodePos(tree) {
                    for(var level in tree) {
                        if(level>0) {
                            for(var index in levelArr[level]) {
                                var node = levelArr[level][index];
                                var lastNode = levelArr[level][index-1]; //上一个节点
                                if(lastNode == undefined) {
                                    lastNode = {};
                                }
                                if(node.parent == lastNode.parent) { //同一父节点，后面的节点处理
                                    node.posY = lastNode.posY + lastNode.height/2 + node.height/2;
                                } else { //第一个节点
                                    var parentTop = node.parent.posY - node.parent.height/2;
                                    node.posY = parentTop + node.height/2;
                                }
                            }
                        }
                    }
                }
                getNodePos(levelArr);
            }

            countNodePos(treeData);

            state.treeData = treeData;
        },
        setCurrentNode(state,node) {
            state.currentNode = node;
        },
        delNode(state) {
            var arr = state.currentNode.parent.sub;
            for(var i=0; i < arr.length; i++) {
                if(arr[i] == state.currentNode) {
                    arr.splice(i,1);
                    break;
                }
            }
            if(i == 0) i = 1;
            let currentNode = arr[i-1];
            if(!currentNode) currentNode = state.currentNode.parent;
            state.currentNode = currentNode;
        },

        //属性相关
        setShowPropertyKey(state,key) {
            state.showPropertyKey = key;
        },
        showDetail(state,data) {
            state.detailIsShow = true;
            state.detailData = data;
        },
        setDetailEdit(state,status) {
            state.detailIsEdit = status;
        },
        setDetailShow(state,status) {
            state.detailIsShow = status;
        },

        //文件相关
        setFileList(state,data) {
            state.fileList = data;
        },
        addFile(state,data) {
            state.fileList.push(data);
        },
        setCurrentFileId(state,id) {
            state.currentFileId = id;
        },

    },
    actions: {
        getTreeData(context){
            Api.get('files/read', {id:context.state.currentFileId}, function (data) {
                let treeData = JSON.parse(data.content);
                context.commit('setTreeData',treeData);
                context.commit('setCurrentNode',treeData);
            });
        },
        getFileList(context) {
            Api.get('files/index', {}, function (data) {
                context.commit('setFileList',data.files);
                context.commit('setUsername',data.username);
            });
        }
    },
    modules: {
        
    }
})