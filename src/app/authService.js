angular.module('livefeed.authService', [])

.service('TokenHandler', function (){
  
  return {
    
    store_token: function(token, id){
      window.sessionStorage.setItem('token', token);
      window.sessionStorage.setItem('loggedin', 'true');
      window.sessionStorage.setItem('uid', id);
    },

    remove_token: function(){
      window.sessionStorage.setItem('token',"");
      window.sessionStorage.setItem('loggedin', "false");
      window.sessionStorage.setItem('uid', null);
    },

    get_token: function(){
      return window.sessionStorage.getItem("token");
    },

    get_uid: function(){
      return window.sessionStorage.getItem("id");
    }
  };
})

.service('Auth', function (){
  
  return {
    is_logged_in: function(){
      var value = window.sessionStorage.getItem("loggedin");
      if(value === 'true'){
        return true;
      }
      else{
        return false;
      }
    }
  };
});