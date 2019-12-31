let $ = window.$;

$(document).ready(()=>{
    const vueApp = new Vue({
        el:'.app',
        data:{
            token:localStorage.getItem('bearer_token'),
            user:JSON.parse(localStorage.getItem('system_user')),
            page:localStorage.getItem('system_current_page'),
        },
        methods:{
            home(){
                localStorage.setItem('system_current_page','home');
                this.page = 'home'
            },

            getallstudents(){
                localStorage.setItem('system_current_page','all');
                this.page = 'all'

            },

            search(){
                localStorage.setItem('system_current_page','search');
                this.page = 'search';

            },

            exit(){
                this.token='undefined';
                localStorage.setItem('bearer_token','undefined');
            },
            login(ev){
                ev.preventDefault();
                let login = $('#login').val();
                let password = $('#password').val();
                if(login=="" || password==""){
                    $("#login_btn").removeClass("btn-primary").addClass("btn-danger");
                    setTimeout(()=>{
                        $("#login_btn").removeClass("btn-danger").addClass("btn-primary");
                    },3000)

                }else{
                    $.ajax({
                        url:"http://127.0.0.1:8000/api/login",
                        method:'POST',
                        data:{
                            login:login,
                            password:password
                        },
                        error:(resp)=>{

                        },
                        success:(resp)=>{
                            this.token = resp.bearer_token;
                            this.user = resp;
                            this.page = "home";
                            localStorage.setItem('system_user',JSON.stringify(resp));
                            localStorage.setItem('bearer_token',resp.bearer_token);
                            localStorage.setItem('system_current_page','home');
                        }
                    })
                }

            }

        }
    })
});
