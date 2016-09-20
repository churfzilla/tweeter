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

