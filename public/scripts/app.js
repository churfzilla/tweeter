$(function () {

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

  $('#new-tweet').on('submit', function (event) {
    event.preventDefault();
    const theForm = $(this);
    $.ajax({
      url: theForm.attr('action'),
      method: theForm.attr('method'),
      data: theForm.serialize(),
      dataType: 'json',
      success: function () {
        createTweetElement();
      }
    });
  });

  const renderTweets = function renderTweets(tweets) {
    tweets.sort(function (a, b) {
      return b.created_at - a.created_at;
    });
    tweets.forEach(function (tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  }

  const loadTweets = () => {
  // Reads the tweets from the database and renders to the website
    $.get('/tweets')
      .then(renderTweets)
      .then(() => {
        $('#new-tweet').val('');
      })
  }
    const validateForm = () => {
      const tweetLength = $('.new-tweet form textarea').val().length;
      if (tweetLength > 140) {
        return false;
      } else {
        return true;
      }
    }
  loadTweets();
});