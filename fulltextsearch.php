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
      $mysqldb->query("SELECT name,url FROM webresource WHERE MATCH(description) AGAIST('$keywords')");

      // Output from retrieved rows or display appropriate message
      if ($mysqldb->numrows() > ()) {
          while ($row = $mysqldb->fetchobject()
          echo "<a href=\"$row->url\">$row->name</a><br />";
      } else {
          echo "No results found.";
      }
  }
?>