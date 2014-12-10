// The data, to be replaced by an ajax call
var data = { 
  posts: [
    {
      "id": 1,
      "userId": 1,
      "date": "",
      "content":"Love wine? Love food? Love to win an iPad 2 with gift certificates to your favorite IA winery & Dine IA restaurant. http://bit.ly/xQ4Ls8",
      "comments": [
        {
          "id": 13,
          "postId": 1,
          "userId": 3,
          "date": "",
          "content": "Would you happen to know were Capone is? Since you are a secret agent and all"
        }
      ]
    },
    {
      "id": 2,
      "userId": 3,
      "date": "",
      "content":"Day 2 of house sitting...awww my firends really do Trust me!",
      "comments": []
    },
    {
      "id": 3,
      "userId": 4,
      "date": "",
      "content":"Just got doing some sword fighting with Connor! THERE CAN BE ONLY ONE!",
      "comments": [
        {
          "id": 10,
          "postId": 3,
          "userId": 1,
          "date": "",
          "content": "Let me know when you're going to be going at it again, I would love to join"
        },
        {
          "id": 11,
          "postId": 3,
          "userId": 4,
          "date": "",
          "content": "sure thing"
        }
      ]
    },
    {
      "id": 4,
      "userId": 2,
      "date": "",
      "content":"How do I even have friends?! Oh wait.... I don't. Glad I have internet firends! I'd be screwed without them... #LameTweetIsLame #hobit #somereallylonghashtag #longcomment #eggs #stuff",
      "comments": []
    },
    {
      "id": 5,
      "userId": 3,
      "date": "",
      "content":"I want to thank ALL MY FIRENDS BOTH OLD AND NEW FOR THE ENCOURAGING WORDS....LOVE YOU GUYS!!!!!",
      "comments": []
    },
    {
      "id": 6,
      "userId": 1,
      "date": "",
      "content":"Just got back from the moon, they have sharks with lazers on their heads",
      "comments": [
        {
          "id": 12,
          "postId": 6,
          "userId": 2,
          "date": "",
          "content": "Hey, what else was there? I want to write a book on it"
        }
      ]
    }
  ],
  users: [
    {
      "id": 1,
      "username": "James Bond",
      "pic": "images/profile/Sean-Connery-as-James-Bond.jpg",
      "about": "Secret Agent, for MI6 code name 007, need I say more?"
    },
    {
      "id": 2,
      "username": "William Forrester",
      "pic": "images/profile/2001_finding_forrester_008.png",
      "about": "I make better writers out of high school kids"
    },
    {
      "id": 3,
      "username": "Jim Malone",
      "pic": "images/profile/sean_connery_the_untouchables.jpg",
      "about": " I picked the men out for Ness's crew from the police academy to go after Capone  "
    },
    {
      "id": 4,
      "username": "Juan Sanchez Villalobos Ramirez",
      "pic": "images/profile/Sean-Connery-as-James-Bond.jpg",
      "about": "Trained Connor in the art of sword fighting"
    },
    {
      "id": 5,
      "username": "Daniel Craig",
      "pic": "images/profile/daniel-craig.jpg",
      "about": "James Bond reloaded"
    }
  ]
}; 
//Define variables
var pageTemplate = $("#pageTemplate").html(), 
    compilePage = Handlebars.compile(pageTemplate),
    avatarTemplate = $("#avatarTemplate").html(),
    compileAvatar = Handlebars.compile(avatarTemplate),
    newPost = $("#newPost").html(),
    compilePost = Handlebars.compile(newPost),
    currentUserId = 5; 

//Create helpers
Handlebars.registerHelper('username', function(options) {
  var id = this.userId,
      userInfo = $.grep(options.data.root.users, function(userInfo) {
        return userInfo.id == id;
      })[0];
  return userInfo ? userInfo.username : "";
});
Handlebars.registerHelper('avatar', function(options) {
  var id = this.userId,
      userInfo = $.grep(options.data.root.users, function(userInfo) {
        return userInfo.id == id;
      })[0];
  return userInfo ? userInfo.pic : "";
});
Handlebars.registerHelper('currentuser', function(options) {
  var id = currentUserId,
      userInfo = $.grep(options.data.root.users, function(userInfo) {
        return userInfo.id == id;
      })[0];
  return userInfo ? userInfo.username : "";
});
Handlebars.registerHelper('currentavatar', function(options) {
  var id = currentUserId,
      userInfo = $.grep(options.data.root.users, function(userInfo) {
        return userInfo.id == id;
      })[0];
  return userInfo ? userInfo.pic : "";
});
Handlebars.registerHelper('postcontent', function(options) {
  var thoughts = $(".postInput").val() || $(".dialog-input").val();
  return thoughts;
});

//Add templates to page
$('#page').append(compilePage(data));
$('.currentavatar').html(compileAvatar(data));
$(".main-input").on("submit", function(e){
  e.preventDefault();
  $('.feed').append(compilePost(data));
  $(".postInput").val("");
});
$("#dialog button").on("click", function(e){
  $('.feed').append(compilePost(data));
  $(".dialog-input").val("");
});

//Configure dialog
$( "#dialog" ).dialog({
  autoOpen: false,
  width: 400,
  buttons: [
    {
      text: "Post",
      click: function() {
        $('.feed').append(compilePost(data));
        $( this ).dialog( "close" );
      }
    },
  ]
});
$( "#dialog-link" ).click(function( event ) {
  $( "#dialog" ).dialog( "open" );
  event.preventDefault();
});
