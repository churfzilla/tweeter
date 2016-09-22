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
  // var MAX_CHAR_COUNT = 140;

  // // Character counter
  // $('section.new-tweet form textarea').on('input', function (e) {
  //   var counter = $(this).siblings('span.counter');
  //   var charCount = $(this).val().length;
  //   counter.text(TWEETLENGTHMAX - charCount);
  //   counter.css('color', charCount > TWEETLENGTHMAX ? 'red' : 'inherit');
  // });

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
  const createTweetElement = function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');
    var $tweetHeader = $('<header>').appendTo($tweet);

    $('<img>').attr('src', tweet.user.avatars.small)
      .attr('alt', tweet.user.name + '\'s profile image')
      .appendTo($tweetHeader);

    $('<h3>').text(tweet.user.name)
      .appendTo($tweetHeader);

    $('<span>').text(tweet.user.handle)
      .appendTo($tweetHeader);

    $('<section>').text(tweet.content.text)
      .appendTo($tweet);

    var $tweetFooter = $('<footer>').text(moment(tweet.created_at).fromNow())
      .appendTo($tweet);

    var $tweetFooterIcons = $('<div>')
      .appendTo($tweetFooter);

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

  // render all the tweets
  function renderTweets(tweets) {
    tweets.forEach(function (tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  }

  // New tweet form submission
  $('section.new-tweet form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    validateTweet(form);
  });

  // Validate tweet form submission and send if valid
  function validateTweet(form) {
    var text = form.children('textarea[name=text]').val();
    var err = form.parent().children('div.error-container');

    if (text === '') {
      alert('Nothing to say? Then kick rocks!');
      return false;
    } else if (text.length > TWEETLENGTHMAX) {
      alert('Gear down big-rig, you have written too much');
      return false;
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
            form.children('span.counter').text(TWEETLENGTHMAX).css('color', 'inherit');
          });
        }
      });
    return true;
  }

  loadTweets(renderTweets);

});