<?php
	$fp = fopen("../json/projects.json", 'r');
	$projects = "";
	while (!feof($fp)) {
		$projects .= fread($fp, 100000);
	}
	fclose($fp);
	iconv('gbk','utf-8', $projects);
	str_replace("'", '"', $projects);
	$projects = json_decode($projects, true);
	$projects = $projects["projects"];
	$finalStr = "";
	for ($eachProject = 0; $eachProject < count($projects); ++$eachProject) {
		$project = $projects[$eachProject];
		$finalStr .= "<div class = \"pt-page\">";
		$finalStr .= "<div class = \"projectPhoto\" style = \"background-image: url(".$project["imageurl"].")\"></div>";
		$finalStr .= "<div class = \"projectIntro\">
                        <h1 class = \"projectTitle\">".$project["title"]."</h1>
                        <ul class = \"projectDetail\">
                            <li><Strong>Type:</Strong> ".$project["type"]."</li>
                            <li><Strong>Language:</Strong> ".$project["language"]."</li>
                            <li><Strong>Platform:</Strong> ".$project["platform"]."</li>
                            <li><Strong>Date:</Strong> ".$project["date"]."</li>
                            <li><Strong>Role:</Strong> ".$project["role"]."</li>
                            <li><Strong>Description:</Strong> ".$project["description"]."</li>";
       	if (!is_null($project["other"])){
       		for ($otherInfo = 0; $otherInfo < count($project["other"]); ++$otherInfo) {
       			$info = $project["other"][$otherInfo];
       			if ($info["img"] != "") {
       				$finalStr .= "<li><iframe src = \"".$info["img"]."\" width = \"15px\" height = \"15px\"></iframe>";
       				$finalStr .= "<a href = \"".$info["url"]."\" target = \"_blank\">".$project["title"]."</a></li>";
       			} else {
       				$finalStr .= "<li>";
       				$finalStr .= "<a href = \"".$info["url"]."\" target = \"_blank\">".$project["title"]." (".$info["url"].")</a></li>";
       			}
       		}
       	}
       	$finalStr .= "</div></div>";
	}
	echo $finalStr;
?>