<?php

//////////////////////////////////////////////////////////////////////////////
//connect to database
$a=mysql_connect("localhost","root","");
$b=mysql_select_db("twittertable",$a);

//////////////////////////////////////////////////////////////////////////////
//First pick up the parameters from the form 

$userName = $_POST["userName"];
$twitterName = $_POST["twitterName"];
$userLocation = $_POST["userLocation"];
$description = $_POST["description"];
$numOfFollowers = $_POST["numOfFollowers"];
$numOfFollowing= $_POST["numOfFollowing"];
$numOfTweets= $_POST["numOfTweets"];

if ( $userName == "" || $twitterName == ""  || $userLocation == ""  || $description == "" || $numOfFollowers == ""  || $numOfFollowing == "" ||$numOfTweets == "")  {
  

// if one of the fields are empty,redirect to here.
  header( "location:registrationfail.html" );
  exit();
}


//////////////////////////////////////////////////////////////////////////////
//insert values from the form into customer
$query = "INSERT INTO `twittertable`.`twitter` (`twitterID`, `twitterUsername`, `twitterName`, `liked`, `userLocation`, `userDescription`, `numberOfFollowers`, `numberFollowing`, `numberOfTweets`) 
VALUES ('1', 'test', 'tester', 'not liked', 'craptown', 'life as we know it', '0', '0', '0')";
 

$insResult = mysql_query($query);
if ($insResult)
{
   print("Follower details for " . $userName . " have been inserted<br/>");
}
else

  	  exit ( mysql_error(). "</p></body></html>" );   //vital to know why it failed

/////////////////////////////////////////////////////////////////////////////

?>

<!DOCTYPE html> 
<html lang="en">
    <head>
          <title>Registration Successful</title>

</head>
<body>
<h1 align='center'>The data has been successfully entered into our database!</h1>
<p align='center'><a href="First.html">
    <button> Back to log-in page.</button>
  </p>

</body>
</html>
