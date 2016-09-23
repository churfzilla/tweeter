$(function () {

const TWEETLENGTHMAX = 140;
const WARNING_CLASS = "redText";

let $textArea = $( ".new-tweet form textarea" );
let $counter = $($textArea.siblings(".counter")[0]);

let updateCounter = function() {
  let tweetLength = this.value.length;
  $counter.text(TWEETLENGTHMAX - tweetLength);
  if (tweetLength > TWEETLENGTHMAX){
    $counter.addClass(WARNING_CLASS);
  } else {
    $counter.removeClass(WARNING_CLASS);
  }
};
$textArea.on("input", updateCounter);

// Load tweets from database -------------
  function loadTweets(cb) {
    $.ajax({
      method: 'get',
      url: '/tweets',
      dataType: 'json',
      success: cb
    });
  }

// Creates the Tweet element in the DOM -----------------------------
  const createTweetElement = function(tweet) {
    var $tweet = $('<article>').addClass('tweet');
    var $tweetHeader = $('<header>').appendTo($tweet);
    var $tweetFooter = $('<footer>').text(moment(tweet.created_at).fromNow())
      .appendTo($tweet);
    var $tweetFooterIcons = $('<div>')
      .appendTo($tweetFooter);

    $('<img>').attr('src', tweet.user.avatars.small)
      .attr('alt', tweet.user.name + '\'s profile image')
      .appendTo($tweetHeader);

    $('<h3>').text(tweet.user.name)
      .appendTo($tweetHeader);

    $('<span>').text(tweet.user.handle)
      .appendTo($tweetHeader);

    $('<section>').text(tweet.content.text)
      .appendTo($tweet);

    $('<i>').addClass('fa fa-font-awesome')
      .attr('aria-hidden', 'true')
      .appendTo($tweetFooterIcons);

    $('<i>').addClass('fa fa-heart')
      .attr('aria-hidden', 'true')
      .appendTo($tweetFooterIcons);

    $('<i>').addClass('fa fa-retweet')
      .attr('aria-hidden', 'true')
      .appendTo($tweetFooterIcons);

    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach(function (tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  }

  $('section.new-tweet form').on('submit', function (e) {
    e.preventDefault();
    validateTweet($(this));
  });

  /*
    validates tweet
    - text not null
    - less than x chars

    returns false when not valid; true otherwise
  */
  function validateTweet(form) {
    var text = form.children('textarea[name=text]').val();
    var err = form.parent().children('div.error-container');

    if (text === '') {
      return alert('Nothing to say? Then kick rocks!');
    } else if (text.length > TWEETLENGTHMAX) {
      return alert('Gear down big-rig, you have written too much');
    }

    $.ajax({
        method: form.attr('method'),
        url: form.attr('action'),
        dataType: 'json',
        data: form.serialize(),
        success: function () {
          loadTweets(function (tweets) {
            $('#tweets-container').prepend(createTweetElement(tweets[0]));
            err.text('');
            form.children('textarea[name=text]').val('');
            form.children('span.counter').text(TWEETLENGTHMAX);
          });
        }
      });
    return true;
  }

  // Sets the cursor into the text area - called when animation is finished
  $.fn.setCursorPosition = function(pos) {
    this.each(function(index, elem) {
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select();
      }
    });
    return this;
  };

 // creates a toggle animation for the composing of a new tweet
  $( "#nav-bar .compose" ).click(function() {
    $( "section.new-tweet").slideToggle("slow", function() {
      $('.new-tweet form textarea').setCursorPosition(0);
    });
  });
  loadTweets(renderTweets);
});