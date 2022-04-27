<?php
  // If the form has been submitted with supplied keywords
  if (isset($_POST['keywords'])) {
      include "mysql.class.php";
      // Connect to server and select database
      $mysqldb = new mysqli("localhost", "root","", "");
      $mysqldb->connect();
      $mysqldb->select_db();


      $keywords = $_POST['keywords'];
      //create the query
      $sql->query("SELECT name,url FROM webresource WHERE MATCH(description) AGAIST('$keywords')");

      // Output from retrieved rows or display appropriate message
      
      if ($result=mysqli_query($con,$sql));
      {
        $rowcount=mysqli_num_rows($result);
        while ($obj = $result -> fetch_object())
        echo "<a href=\"$row->url\">$row->name</a><br />";
    };
  }

  $mysqli -> close();

?>