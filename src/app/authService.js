angular.module('livefeed.authService', [])

.service('TokenHandler', function (){

  return {

    store_token: function(token, username, user_role, fullname, remember_me, password){
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('loggedin', 'true');
      window.sessionStorage.setItem('username', username);
      window.sessionStorage.setItem('user_role', user_role);
      window.sessionStorage.setItem('fullname', fullname);
      if(remember_me){
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('password', password);
        window.localStorage.setItem('remember_me', true);
      }
      else{
        window.localStorage.setItem('username', "");
        window.localStorage.setItem('password', "");
        window.localStorage.setItem('remember_me', false);
      }
    },

    remove_token: function(){
      window.sessionStorage.setItem('token',"");
      window.sessionStorage.setItem('loggedin', "false");
      window.sessionStorage.setItem('username', "");
      window.sessionStorage.setItem('user_role', "");
      window.sessionStorage.setItem('fullname', "");

      window.localStorage.setItem('username', "");
      window.localStorage.setItem('password', "");
      window.localStorage.setItem('remember_me', false);
    },

    get_login_detail: function(){
      return {
        username: window.localStorage.getItem('username'),
        password: window.localStorage.getItem('password'),
        remember_me: window.localStorage.getItem('remember_me')
      };
    },

    get_token: function(){
      return window.sessionStorage.getItem("token");
    },

    get_username: function(){
      return window.sessionStorage.getItem("username");
    },

    get_user_role: function(){
      return window.sessionStorage.getItem("user_role");
    },

    get_fullname: function(){
      return window.sessionStorage.getItem("fullname");
    }
  };
})

.service('Auth', function (TokenHandler){

  return {
    is_logged_in: function(){
      var value = window.sessionStorage.getItem("loggedin");
      if(value === 'true'){
        return true;
      }
      else{
        return false;
      }
    },
    is_remembered: function(){
      var value = window.localStorage.getItem("remember_me");
      return value;
    },
    is_logged_out: function(){
      TokenHandler.remove_token();
    }
  };
});
