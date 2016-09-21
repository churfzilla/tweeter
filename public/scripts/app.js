$(function () {
  // Fake data taken from tweets.json
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function createTweetElement(tweet) {
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

  function renderTweets(tweets) {
    tweets.sort(function (a, b) {
      return b.created_at - a.created_at;
    });
    tweets.forEach(function (tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    });
  }

  renderTweets(data);

});