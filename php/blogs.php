<?php
	$fp = fopen("../json/blogs.json", 'r');
	$blogs = "";
	while (!feof($fp)) {
		$blogs .= fread($fp, 100000);
	}
	fclose($fp);
	iconv('gbk','utf-8', $blogs);
	str_replace("'", '"', $blogs);
	$blogs = json_decode($blogs, true);
	$blogs = $blogs["BLOGS"];
	$category = "";
	$detail = "";
	for ($eachBlog = 0; $eachBlog < count($blogs); ++$eachBlog) {
		$blog = $blogs[$eachBlog];
		$category .= "<tr id = \"".$eachBlog."\">
						<td><p><strong>".$blog["title"]."</strong> | 发布于 ".$blog["date"]."</p></td>
					  </tr>";
		$detail .= "<div class = \"pt-page\" id = \"page".$eachBlog."\">
						<div class = \"oneBlog\">
							<svg class = \"back\" width = \"40px\" height = \"40px\" enable-background=\"new 0 0 100 100\" viewBox=\"0 0 100 100\">
							<polygon fill=\"#8DB6CD\" points=\"77.6,21.1 49.6,49.2 21.5,21.1 19.6,23 47.6,51.1 19.6,79.2 21.5,81.1 49.6,53 77.6,81.1 79.6,79.2 51.5,51.1 79.6,23 \"/>
							</svg>
							<div class = \"blogHeader\">
								<div class = \"blogTitle\">
                                	<p>".$blog["title"]."</p>
                            	</div>
                            	<div class = \"blogDate\">
                                	<p>发布于 ".$blog["date"]."</p>
                            	</div>
                        	</div>  
                        	<hr/>
	                        <div class = \"blogContent\">
	                            <p>".$blog["content"]."</p>
	                        </div>
	                        <hr/>
	                    </div>
	                </div>";
	}
	$res = [$category, $detail];
	echo $category."\0".$detail;
?>