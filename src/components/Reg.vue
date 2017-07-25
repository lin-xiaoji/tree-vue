<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="username">
            <Input type="text" v-model="formInline.username" placeholder="请输入帐号"/>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入密码" />
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.RePassword" placeholder="请确认密码" />
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')" long>注册</Button>
        </Form-item>
    </Form>

</template>
<script>
    import Api from '../utils/Api'
    import Cookie from '../utils/Cookie'
    export default {
        data () {
            return {
                formInline: {
                    username: '',
                    password: '',
                    RePassword: '',
                },
                ruleInline: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' }
                    ],
                    RePassword: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if(valid) {
                        Api.post('login/reg',this.$data.formInline, () =>{
                            this.$parent.$parent.regModal = false;
                            this.$Message.success('注册成功');
                        });
                    }
                });
            }
        }
    }
</script>
