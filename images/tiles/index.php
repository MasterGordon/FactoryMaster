<?php
$dir = new DirectoryIterator(dirname("images"));
foreach ($dir as $fileinfo) {
    if (!$fileinfo->isDot()) {
	$file = $fileinfo->getFilename();
	echo '<img src='.$file.'>';	
        //echo '<img src="' . $file . '.png"</img>');
    }
}
?>