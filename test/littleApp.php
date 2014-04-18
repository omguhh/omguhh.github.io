<?php

require_once('TwitterAPIExchange.php');
// Entering application keys and tokens to get through twitter authentication
$settings = array(
    'oauth_access_token' => "173731158-1F51dF4kVgjT78s4V8miSDWKbQHUmIlMqzCitn8C",
    'oauth_access_token_secret' => "FPaWzv6gT7oy8JgxGhAb8BwLSdDZXQjZOL2MUa3379ZC2",
    'consumer_key' => "OM5lm0GpUXCcezdWf6uoQ",
    'consumer_secret' => "tWAmGPYjcTeOAdMQsgfmPwfGyJY9yY00gue3wiEyU" 
);

$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?username=omguhh&count=1';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
$twitterOutput =  $twitter->setGetfield($getfield)  
                                     ->buildOauth($url, $requestMethod) 
                                     ->performRequest(); 
// var_dump(json_decode($twitterOutput));

$arrResults = json_decode($twitterOutput,true); // note the true instead of your false and this creates a PHP associative array

foreach ($arrResults as $arrSearchResult) {  // loop through each tweet 
    $strTweet = $arrSearchResult['text'] ;  // retrieve  the text of the tweet
        print_r("<div class='tweet'>$strTweet</div>"); // tell the world
    }


?>
