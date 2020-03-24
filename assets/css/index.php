<?php get_header() ?>


<?php
    
    // this script is for getting the total posts count of each post type

    $date = new DateTime();
    $today_date = $date->getTimestamp();

    $args = array(
        'post_type' => 'post'
    );
    $articles_query = new WP_Query( $args );
    $articles_count = $articles_query->found_posts;

    $args = array(
        'post_type' => 'scholarship',
        'meta_query'    => array(
            'relation'      => 'AND',
            array(
                'key'       => 'wpcf-expire-date',
                'value'     => $today_date,
                'compare'   => '>=',
            )
        ),
    );
    $scholarships_query = new WP_Query( $args );
    $scholarships_count = $scholarships_query->found_posts;

    $args = array(
        'post_type' => 'online_activities',
        'meta_query'    => array(
            'relation'      => 'AND',
            array(
                'key'       => 'wpcf-online_activity_last_date',
                'value'     => $today_date,
                'compare'   => '>=',
            )
        ),
    );
    $online_activities_query = new WP_Query( $args );
    $online_activities_count = $online_activities_query->found_posts;

    $args = array(
        'post_type' => 'universities-profile'
    );
    $universities_profiles_query = new WP_Query( $args );
    $universities_profiles_count = $universities_profiles_query->found_posts;
    
?>

<!-- PAGE CONTENT -->
<div class="body_view" id="page-content" ng-controller="home_controller" ng-init="get_last_posts()">
    
    <section class="full-section dark-section parallax" id="section-57" style="display: none;background-image: url({{bg_image}});">
          <div class="overlay"></div>
        <div class="full-section-container">
            <center>
                <i><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.34 84.74" width="80" height="80"><defs><style>.cls-1{fill:#fff; height:100px; width:100px;}</style></defs><title>Untitled-1</title><path class="cls-1" d="M88.65,40.39l-27,27.32a15.29,15.29,0,0,1-4.88,2.77,12.7,12.7,0,0,1-8-.4s3.43-2.11,4.5-7.83c0,0,1-5-.46-8.61,0,0-1.68-4.65-4.57-6.4l8.73-9.74a17.63,17.63,0,0,1-3.8-1l-7.23,8.12-7-7.86a13.58,13.58,0,0,1-3.73,1.29L45.88,49.61s3.45,2.59,4.29,6.32a10.7,10.7,0,0,1,0,5.71,15.3,15.3,0,0,1-4.29,6.63,9.62,9.62,0,0,1-3.94-5.41,14.08,14.08,0,0,1-.23-7.16,9.5,9.5,0,0,1,2.18-4.18s.82-1.29,0-2.14a1.76,1.76,0,0,0-2.46-.11,15.25,15.25,0,0,0-3.27,9.05s-.55,3.16,1.63,7.74a17.24,17.24,0,0,0,6,6,16.48,16.48,0,0,0,7.91,2,13.82,13.82,0,0,0,9.05-3.16L90,43.53A9.41,9.41,0,0,0,92,40.33c.3-1.06.3-1.06.3-3.82Z"/><path class="cls-1" d="M42.57,34.74a4.64,4.64,0,0,0-.65-.66,17.15,17.15,0,1,1,3.13-25.4A19.32,19.32,0,0,1,47,6.53,19.83,19.83,0,0,0,32.27,0C19.13,0,12.45,8.87,12.46,19.82a19.82,19.82,0,0,0,31.09,16.3,2.32,2.32,0,0,1-1-1.39"/><path class="cls-1" d="M59.49,0A19.81,19.81,0,0,0,41.9,10.68a14.07,14.07,0,0,1,1.9,2.7A17.1,17.1,0,1,1,50,34a13.11,13.11,0,0,0-1.49,2.31A19.82,19.82,0,1,0,59.49,0"/><path class="cls-1" d="M41.85,28.8c.11.21.21.43.33.64a7,7,0,0,1,.5-1A11,11,0,0,1,44.07,27c-.1-.22-.2-.45-.29-.68a13.76,13.76,0,0,1-1.93,2.49"/><path class="cls-1" d="M59.58,5.46A14.48,14.48,0,1,0,74.05,19.94,14.48,14.48,0,0,0,59.58,5.46m0,26.1A11.66,11.66,0,1,1,71.26,19.9,11.66,11.66,0,0,1,59.6,31.56"/><polygon class="cls-1" points="40.59 30.3 45.88 36.34 51.07 30.47 53.69 32.16 45.88 40.85 38.17 32.11 40.59 30.3"/><path class="cls-1" d="M59.58,11.19a8.69,8.69,0,1,0,8.69,8.69,8.69,8.69,0,0,0-8.69-8.69m0,14.95A6.16,6.16,0,1,1,65.77,20a6.16,6.16,0,0,1-6.16,6.16"/><path class="cls-1" d="M62.79,19.92a3.19,3.19,0,1,1-3.19-3.19,3.19,3.19,0,0,1,3.19,3.19"/><polygon class="cls-1" points="79.31 19.95 79.31 0.02 59.59 0 59.59 2.78 76.71 2.78 76.71 19.96 79.31 19.95"/><path class="cls-1" d="M32.18,5.46A14.48,14.48,0,1,0,46.66,19.94,14.48,14.48,0,0,0,32.18,5.46m0,26.25A11.73,11.73,0,1,1,43.9,20,11.73,11.73,0,0,1,32.17,31.72"/><path class="cls-1" d="M32.18,11.19a8.69,8.69,0,1,0,8.69,8.68,8.68,8.68,0,0,0-8.69-8.68m0,14.82a6.1,6.1,0,1,1,6.1-6.1,6.1,6.1,0,0,1-6.1,6.1"/><path class="cls-1" d="M29,19.92a3.19,3.19,0,1,0,3.19-3.19A3.19,3.19,0,0,0,29,19.92"/><polygon class="cls-1" points="12.46 19.98 12.46 0.03 32.17 0 32.17 2.84 15.02 2.84 15.02 19.98 12.46 19.98"/><path class="cls-1" d="M.28,36.34l29.88,31.5a11.07,11.07,0,0,0,4,2.66s1.58.85,5.57.06c0,0,1.17-.52,1.87.13,0,0,1.65,1.1,0,2.8,0,0-1.5,1-6.43.7a12.39,12.39,0,0,1-6-3L2.78,43.73A7.17,7.17,0,0,1,.66,40.3a16.3,16.3,0,0,1-.39-4"/><path class="cls-1" d="M87.69,23.7,60.28,51.33a8.82,8.82,0,0,0-1,1.29,1.74,1.74,0,0,0,0,1.45,1.18,1.18,0,0,0,.67.54,1.69,1.69,0,0,0,1.38-.18L92.16,23.7Z"/><path class="cls-1" d="M91.91,28.07,63.7,56.41A2.14,2.14,0,0,0,63,57.48a1.3,1.3,0,0,0,.05.94,1.37,1.37,0,0,0,1.11.77,2.29,2.29,0,0,0,1.38-.43l26.35-26.3Z"/><path class="cls-1" d="M77.19,23.7,76,27.12a15.93,15.93,0,0,1-8.51,8.56L55.74,47.54a1.73,1.73,0,0,0-.58.94,1.5,1.5,0,0,0,0,.7,1.46,1.46,0,0,0,1,1,1.75,1.75,0,0,0,1.19-.27L83.66,23.7Z"/><path class="cls-1" d="M35.61,47.54,24.33,36.19a15.39,15.39,0,0,1-8.27-8.32L14.33,23.7H7.69L34,49.89a1.75,1.75,0,0,0,1.19.27,1.45,1.45,0,0,0,1-1,1.5,1.5,0,0,0,0-.7,1.74,1.74,0,0,0-.58-.95"/><path class="cls-1" d="M4.47,23.7,31.88,51.33a8.82,8.82,0,0,1,1,1.29,1.74,1.74,0,0,1,0,1.45,1.18,1.18,0,0,1-.67.54,1.69,1.69,0,0,1-1.38-.18L0,23.7Z"/><path class="cls-1" d="M.25,28.07,28.46,56.41a2.14,2.14,0,0,1,.67,1.07,1.3,1.3,0,0,1-.05.94,1.37,1.37,0,0,1-1.11.77,2.29,2.29,0,0,1-1.38-.43L.25,32.45Z"/><path class="cls-1" d="M53.87,84.7l-9-8.93a1.88,1.88,0,0,1-.21-1.25c.17-.89,1.28-.85,1.28-.85a1.3,1.3,0,0,1,.85.23l11,10.84Z"/><path class="cls-1" d="M37.88,84.7l9-8.93a1.88,1.88,0,0,0,.21-1.25c-.17-.89-1.28-.85-1.28-.85a1.3,1.3,0,0,0-.85.23L34,84.74Z"/><path class="cls-1" d="M30.77,84.71l6.87-6.79a1.43,1.43,0,0,0,.18-1.27c-.14-.7-1.06-.87-1.06-.87a1.65,1.65,0,0,0-1.37.43L27,84.74Z"/><path class="cls-1" d="M60.91,84.65,54,77.85a1.43,1.43,0,0,1-.18-1.27c.14-.7,1.06-.87,1.06-.87a1.64,1.64,0,0,1,1.37.43l8.38,8.53Z"/></svg></i>
                <h3>Look in MENA</h3>
                <h5>اكتشف الفرص بمكانٍ واحد</h5>
            </center>
            <br><br>
            <div class="container desktophomepage">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="tabs style-3">
                            <ul class="nav nav-tabs items-4">
                                <li class=""><a class="waves" href="#tab-1-1" data-toggle="tab" aria-expanded="true"><h4>المنح</h4><small>والدراسة الجامعية</small></a></li>
                                <!-- <li class="hidden"><a class="waves" href="#tab-1-2" data-toggle="tab" aria-expanded="false"><h4>الأنشطة </h4><small>والفعاليات</small></a></li> -->
                                <li class=""><a class="waves" href="#tab-1-4" data-toggle="tab" aria-expanded="false"><h4>المسابقات</h4><small>والتحديات</small></a></li>
                                <li class=""><a class="waves" href="#tab-1-3" data-toggle="tab" aria-expanded="false"><h4>  الفرص التعليمية</h4><small>والتدريبية</small></a></li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade  in" id="tab-1-1">
                                    <div class="row">
                                        <div class="col-sm-4"> <!-- here -->
                                            <h4>الدراسة الجامعية</h4>
                                            <p>أكثر من 4,000 شخص استفادوا من فرص المنح والدراسة الجامعية لينطلقوا من هذا المكان نحو أهم الجامعات العالمية..</p>
                                            <p class="text-center"> وأنت ماذا تنتظر؟</p>
                                            <p class="text-center">حددّ هدفك وانطلق!</p>
                                        </div>
                                        <div class="col-sm-8">
                                            <ul class="services-list items-7 wow " style="visibility: visible; animation-name: fadeInUp;">
                                                <li class="modall"  ng-click="open_cats_popup('scholarships')">
                                                    <div class="service-box style-5"> 
                                                        <a class="waves search" href="#recent-scholars">
                                                            <div class="service-box-content"> <i class="fa fa-university" ></i>
                                                                <h6>اخر المنح الجامعية</h6>
                                                            </div>
                                                            <!-- service-box-content --> 

                                                        </a>
                                                        <div id="recent-scholars" class="popup">
                                                            <div class="container">
                                                                <div class="popup-box">
                                                                    <div class="pop_up_img">
                                                                        <img src="https://lookinmena.com/wp-content/themes/lookinmena/images/index/scholarships.jpg">
                                                                    </div>

                                                                    <div class="pop_up_text">
                                                                        
                                                                        <div class="popup_heading">
                                                                            <h3> اﻟﻤﻨﺢ اﻟﺪﺭاﺳﻴﺔ</h3>
                                                                        </div>
                                                                        <div class="popup_sub_heading">
                                                                            <span>اﺧﺘﺮ اﻟﺪﺭﺟﺔ اﻟﺪﺭاﺳﻴﺔ ﻭاﻛﺘﺸﻒ:</span>
                                                                        </div>

                                                                        <div class="popup_content">
                                                                            <div>
                                                                                <a class="btn btn-default-1 waves" href="https://lookinmena.com/scholarships_categories/%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D9%88%D8%B3/">بكالوريوس</a><br>
                                                                            </div>
                                                                            <div>
                                                                                <a class="btn btn-default-1 waves" href="https://lookinmena.com/scholarships_categories/master/">ماجستير</a><br>
                                                                            </div>
                                                                            <div>
                                                                                <a class="btn btn-default-1 waves" href="https://lookinmena.com/scholarships_categories/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A7%D9%87/">دكتوراه</a><br>
                                                                            </div>
                                                                        </div>
                                                                     
                                                                    </div><!-- image-box-details -->
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- service-box --> 

                                                </li>
                                                <li class="modall" ng-click="open_cats_popup()">
                                                    <div class="service-box style-5"> 
                                                        <a class="waves" href="#schol_articles">
                                                            <div class="service-box-content"> <i class="fa  fa-file"></i>
                                                                <h6>نصائح وتجارب</h6>
                                                            </div>
                                                            <!-- service-box-content --> 
                                                        </a>
                                                        <div id="schol_articles" class="popup">
                                                            <div class="container">
                                                                <div class="popup-box">
                                                                    <div class="pop_up_img">
                                                                        <img src="https://lookinmena.com/wp-content/themes/lookinmena/images/index/scholarships.jpg">
                                                                    </div>
                                                                    <div class="pop_up_text">
                                                                        <div class="popup_heading">
                                                                            <h3> اقرأ واستكشف</h3>
                                                                        </div>
                                                                        <div class="popup_sub_heading">
                                                                            <span>اختصاصات المنح</span>
                                                                        </div>
                                                                        <div class="popup_content">
                                                                            <select onchange="location = this.value;">
                                                                                <option value="" selected>اختر القسم</option>
                                                                                <option value="https://lookinmena.com/category/university_study/global_lan_diplomas/">شهادات
                                                                                    اللغة
                                                                                    العالمية</option>
                                                                                <option value="https://lookinmena.com/category/university_study/scholarship_guid/">دليل الحصول
                                                                                    على
                                                                                    منحة دراسية</option>
                                                                                <option value="https://lookinmena.com/category/university_study/study_in_turkey/">الدراسة في
                                                                                    تركيا</option>
                                                                                <option value="https://lookinmena.com/category/university_study/annual_scholarships/">أشهر المنح
                                                                                    السنوية</option>
                                                                                <option value="https://lookinmena.com/category/university_study/life_in_europe/">المعيشة والحياة
                                                                                    في أوروبا</option>
                                                                                <option value="https://lookinmena.com/category/university_study/succeed_experiments/">تجارب ناجحة
                                                                                    بالحصول على منحة دراسية</option>
                                                                                <option value="https://lookinmena.com/category/university_study/global_universities/">الجامعات
                                                                                    العالمية</option>
                                                                                <option value="https://lookinmena.com/category/university_study/study-abroad/">الدراسة في الخارج</option>
                                                                            </select>
                                                                        </div>
                                                                    </div><!-- image-box-details -->

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- service-box --> 

                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- tab-pane -->
                                
                                <!-- tab-pane  -->
                                <div class="tab-pane fade" id="tab-1-4">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <h4>المسابقات العالمية</h4>
                                            <p class="text-center">التحدّي والمنافسة خُلقوا لأصحاب الإرادة ومحبي المغامرات..</p>
                                            <p class="text-center">وفرص المسابقات العالمية هنا لتتحدّى نفسك وتستثمر مواهبك عالمياً فمن يعلم ربما أولى خطوات فوزك تنتظرك بهذا المكان!</p>
                                            <p class="text-center">حدّد هدفك وانطلق</p>
                                        </div>
                                        <div class="col-sm-8">
                                            <ul class="services-list items-7 wow " style="visibility: visible; animation-name: fadeInUp;">
                                                <li class="modall"  ng-click="open_cats_popup('online_activities')">
                                                    <div class="service-box style-5"> 
                                                        <a class="waves search" href="https://lookinmena.com/online_activities_categories/all/">
                                                            <div class="service-box-content"> <i class="fa fa-paint-brush" ></i>
                                                                <h6>آخر المسابقات العالمية</h6>
                                                            </div>
                                                            <!-- service-box-content --> 
                                                        </a>

                                                    
                                                    </div>
                                                    <!-- service-box --> 

                                                </li>
                                              
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- tab-pane --> 
                                 <!-- tab-pane  -->
                                <div class="tab-pane fade  in" id="tab-1-3">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <h4>الفرص التعليمية والتدريبية</h4>
                                            <p>60% من المهارات العمليّة المطلوبة لسوق العمل لا يتم تدريسها في الجامعة، بل عليك أنت شخصياً تنمية مهاراتك بنفسك من خلال استغلال فرص الدورات والورش التّعليمية لتنطلق من هذا المكان نحو أحلامك.</p>
                                            <p class="text-center">حدّد هدفك وانطلق!</p>
                                        </div>
                                        <div class="col-sm-8">
                                            <ul class="services-list items-7 wow " style="visibility: visible; animation-name: fadeInUp;">
                                              
                                                <li class="modall" ng-click="open_cats_popup('online_courses')">
                                                    <div class="service-box style-5"> 
                                                        <a class="waves" href="https://lookinmena.com/online_courses_categories/all/">
                                                            <div class="service-box-content"> <i class="fa fa-book"></i>
                                                                <h6>آخر الفرص</h6>
                                                            </div>
                                                            <!-- service-box-content --> 
                                                        </a>
                                                     
                                                    </div>
                                                    <!-- service-box --> 

                                                </li>
                                                <li class="modall" ng-click="open_cats_popup()">
                                                    <div class="service-box style-5"> 
                                                        <a class="waves" href="#courses_articles">
                                                            <div class="service-box-content"> <i class="fa  fa-file"></i>
                                                                <h6> نصائح وتجارب</h6>
                                                            </div>
                                                            <!-- service-box-content --> 
                                                        </a>
                                                        <div id="courses_articles" class="popup">
                                                            <div class="container">
                                                                <div class="popup-box">
                                                                    <div class="pop_up_img">
                                                                        <img src="https://lookinmena.com/wp-content/themes/lookinmena/images/index/courses.jpg">
                                                                    </div>
                                                                    <div class="pop_up_text">
                                                                        <div class="popup_heading">
                                                                            <h3> اقرأ واستكشف</h3>
                                                                        </div>
                                                                        <div class="popup_sub_heading">
                                                                            <span>اختصاصات الدورات</span>
                                                                        </div>
                                                                        <div class="popup_content">
                                                                            <select onchange="location = this.value;">
                                                                                <option value="" selected>اختر القسم</option>
                                                                                <option value="https://lookinmena.com/category/courses/academic_specialties/">الاختصاصات الدراسية</option>
                                                                                <option value="https://lookinmena.com/category/courses/learning-languages/">الدليل الشامل لتعلّم
                                                                                    اللغات</option>
                                                                                <option value="https://lookinmena.com/category/courses/wiki_lim/">Wiki LiM</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- service-box --> 

                                                </li>
                                              
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!-- tab-content --> 

                        </div>
                        <!-- tabs --> 

                    </div>
                    <!-- tabs --> 
                </div>

                <!-- col --> 
            </div>

            <!-- mobile view -->
            <div class="container mobilehomepage">
                <div class="row">
                    <div class="col-md-offset-1 col-md-10">
                        <div class="panel-group" id="accordion1">
                            <div class="panel">
                                <div class="panel-heading">
                                    <h6 class="panel-title"> <a class="waves collapsed" data-toggle="collapse"  href="#collapse1" aria-expanded="false">المنح<small> والدراسة الجامعية</small></a> </h6>
                                </div>
                                <!-- panel-heading -->
                                <div id="collapse1" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                    <div class="panel-body">
                                        <div class="row">

                                            <div class="col-sm-4 col-sm-12"> <!-- here -->
                                                <h4>الدراسة الجامعية</h4>
                                                <p>أكثر من 4,000 شخص استفادوا من فرص المنح والدراسة الجامعية لينطلقوا من هذا المكان نحو أهم الجامعات العالمية..</p>
                                                <p class="text-center"> وأنت ماذا تنتظر؟</p>
                                                <p class="text-center">حددّ هدفك وانطلق!</p>
                                            </div>
                                            <div class="col-sm-8 col-sm-12">
                                                <ul class="services-list items-7 wow " style="visibility: visible; animation-name: fadeInUp;">
                                                    <li class="modall"  ng-click="open_cats_popup('scholarships')">
                                                        <div class="service-box style-5"> 
                                                            <a class="waves search" href="#recent-scholars">
                                                                <div class="service-box-content"> <i class="fa fa-university" ></i>
                                                                    <h6>اخر المنح الجامعية</h6>
                                                                </div>
                                                                <!-- service-box-content --> 
                                                            </a>
                                                            <div id="recent-scholars" class="popup" style=" width: 700px;height: auto; direction: rtl;">
                                                                <div class="container">
                                                                    <div class="popup-box">
                                                                        <div class="pop_up_img">
                                                                            <img src="./assets/images/pop_up.jpg">
                                                                        </div>
                                                                        <div class="pop_up_text">
                                                                            <div class="popup_heading">
                                                                                <h3> اﻟﻤﻨﺢ اﻟﺪﺭاﺳﻴﺔ</h3>
                                                                            </div>
                                                                            <div class="popup_sub_heading">
                                                                                <span>اﺧﺘﺮ اﻟﺪﺭﺟﺔ اﻟﺪﺭاﺳﻴﺔ ﻭاﻛﺘﺸﻒ:</span>
                                                                            </div>
                                                                            <div class="popup_content">
                                                                                <div>
                                                                                    <a class="btn btn-default-1 waves" href="https://lookinmena.com/scholarships_categories/%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D9%88%D8%B3/">بكالوريوس</a><br>
                                                                                </div>
                                                                                <div>
                                                                                    <a class="btn btn-default-1 waves" href="https://lookinmena.com/scholarships_categories/master/">ماجستير</a><br>
                                                                                </div>
                                                                                <div>
                                                                                    <a class="btn btn-default-1 waves" href="https://lookinmena.com/scholarships_categories/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A7%D9%87/">دكتوراه</a><br>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- service-box --> 

                                                    </li>
                                                    <li class="modall" ng-click="open_cats_popup()">
                                                        <div class="service-box style-5"> 
                                                            <a class="waves" href="#schol_articles">
                                                                <div class="service-box-content"> <i class="fa  fa-file"></i>
                                                                    <h6>نصائح وتجارب</h6>
                                                                </div>
                                                                <!-- service-box-content --> 
                                                            </a>
                                                            <div id="schol_articles" class="popup">
                                                                <div class="container">
                                                                
                                                                    <div class="popup-box">
                                                                        <div class="pop_up_img">
                                                                            <img src="https://lookinmena.com/wp-content/themes/lookinmena/images/index/scholarships.jpg">
                                                                        </div>
                                                                        <div class="pop_up_text">
                                                                            <div class="popup_heading">
                                                                                <h3> اقرأ واستكشف</h3>
                                                                            </div>

                                                                            <div class="popup_sub_heading">
                                                                                <span>اختصاصات المنح</span>
                                                                            </div>
                                                                            <div class="popup_content">
                                                                                <select onchange="location = this.value;">
                                                                                    <option value="" selected>اختر القسم</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/global_lan_diplomas/">شهادات
                                                                                        اللغة
                                                                                        العالمية</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/scholarship_guid/">دليل الحصول
                                                                                        على
                                                                                        منحة دراسية</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/study_in_turkey/">الدراسة في
                                                                                        تركيا</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/annual_scholarships/">أشهر المنح
                                                                                        السنوية</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/life_in_europe/">المعيشة والحياة
                                                                                        في أوروبا</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/succeed_experiments/">تجارب ناجحة
                                                                                        بالحصول على منحة دراسية</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/global_universities/">الجامعات
                                                                                        العالمية</option>
                                                                                    <option value="https://lookinmena.com/category/university_study/study-abroad/">الدراسة في الخارج</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- service-box --> 
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- panel-body --> 
                                </div>
                                <!-- panel-collapse --> 
                            </div>
                            <!-- panel -->

                            <div class="panel">
                                <div class="panel-heading">
                                    <h6 class="panel-title"> <a class="waves collapsed" data-toggle="collapse"  href="#collapse3" aria-expanded="false">المسابقات<small> والتحديات</small></a> </h6>
                                </div>
                                <!-- panel-heading -->
                                <div id="collapse3" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                    <div class="panel-body">
                                        <div class="row">

                                            <div class="col-sm-4 col-sm-12">
                                                <h4>المسابقات العالمية</h4>
                                                <p class="text-center">التحدّي والمنافسة خُلقوا لأصحاب الإرادة ومحبي المغامرات..</p>
                                                <p class="text-center">وفرص المسابقات العالمية هنا لتتحدّى نفسك وتستثمر مواهبك عالمياً فمن يعلم ربما أولى خطوات فوزك تنتظرك بهذا المكان!</p>
                                                <p class="text-center">حدّد هدفك وانطلق</p>
                                            </div>
                                            <div class="col-sm-8 col-sm-12">
                                                <ul class="services-list items-7 wow " style="visibility: visible; animation-name: fadeInUp;">
                                                    <li class="modall"  ng-click="open_cats_popup('online_activities')">
                                                        <div class="service-box style-5"> 
                                                            <a class="waves search" href="https://lookinmena.com/online_activities_categories/all/">
                                                                <div class="service-box-content"> <i class="fa fa-paint-brush" ></i>
                                                                    <h6>آخر المسابقات العالمية</h6>
                                                                </div>
                                                                <!-- service-box-content --> 

                                                            </a>

                                                        </div>
                                                        <!-- service-box --> 

                                                    </li>
                                                   
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <!-- panel-body --> 
                                </div>
                                <!-- panel-collapse --> 
                            </div>
                            <!-- panel -->



                            <div class="panel">
                                <div class="panel-heading">
                                    <h6 class="panel-title"> <a class="waves collapsed" data-toggle="collapse"  href="#collapse4" aria-expanded="false">الفرص التعليمية<small> والتدريبية</small></a> </h6>
                                </div>
                                <!-- panel-heading -->
                                <div id="collapse4" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
                                    <div class="panel-body">
                                        <div class="row">

                                            <div class="col-sm-4 col-sm-12"">
                                                <h4>الفرص التعليمية والتدريبية</h4>
                                                <p>60% من المهارات العمليّة المطلوبة لسوق العمل لا يتم تدريسها في الجامعة، بل عليك أنت شخصياً تنمية مهاراتك بنفسك من خلال استغلال فرص الدورات والورش التّعليمية لتنطلق من هذا المكان نحو أحلامك.</p>
                                                <p class="text-center">حدّد هدفك وانطلق!</p>
                                            </div>
                                            <div class="col-sm-8 col-sm-12"">
                                                <ul class="services-list items-7 wow " style="visibility: visible; animation-name: fadeInUp;">
                                                 

                                                    <li class="modall" ng-click="open_cats_popup('online_courses')">
                                                        <div class="service-box style-5"> 
                                                            <a class="waves" href="https://lookinmena.com/online_courses_categories/all/">
                                                                <div class="service-box-content"> <i class="fa fa-book"></i>
                                                                    <h6>آخر الفرص</h6>
                                                                </div>
                                                                <!-- service-box-content --> 
                                                            </a>


                                                        </div>
                                                        <!-- service-box --> 

                                                    </li>
                                                    <li class="modall" ng-click="open_cats_popup()">
                                                        <div class="service-box style-5"> 
                                                            <a class="waves" href="#courses_articles">
                                                                <div class="service-box-content"> <i class="fa  fa-file"></i>
                                                                    <h6> نصائح وتجارب</h6>
                                                                </div>
                                                                <!-- service-box-content --> 
                                                            </a>

                                                            <div id="courses_articles" class="popup" style=" width: 700px;height: auto; direction: rtl;">
                                                                <div class="popup-box">
                                                                    <div class="pop_up_img">
                                                                        <img src="./assets/images/pop_up.jpg">
                                                                    </div>
                                                                    <div class="pop_up_text">
                                                                        <div class="popup_heading">
                                                                            <h3> اقرأ واستكشف</h3>
                                                                        </div>
                                                                        <div class="popup_sub_heading">
                                                                            <span>اختصاصات الدورات</span>
                                                                        </div>
                                                                        <div class="popup_content">
                                                                            <select onchange="location = this.value;">
                                                                                <option value="" selected>اختر القسم</option>
                                                                                <option value="https://lookinmena.com/category/courses/academic_specialties/">الاختصاصات الدراسية</option>
                                                                                <option value="https://lookinmena.com/category/courses/learning-languages/">الدليل الشامل لتعلّم
                                                                                    اللغات</option>
                                                                                <option value="https://lookinmena.com/category/courses/wiki_lim/">Wiki LiM</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <!-- service-box --> 

                                                    </li>
                                                 
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <!-- panel-body --> 
                                </div>
                                <!-- panel-collapse --> 
                            </div>
                            <!-- panel -->



                        </div>
                        <!-- accordion --> 
                    </div>
                    <!-- col --> 
                </div>
                <!-- row --> 
            </div>
            <!-- row --> 
        </div>

    <!-- container --> 
    <!-- full-section-container --> 
    </section>







    <section class="full-section dark-section parallax" id="section-57" style="background-image: url({{bg_image}});" ng-init="get_all_posts()">
        <div class="full-section-overlay-color"></div>
        <div class="full-section-container">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="headline text-center">
                            <i><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 92.34 84.74" width="80" height="80">
                                    <defs>
                                        <style>
                                            .cls-1 {
                                                fill: #fff;
                                                height: 100px;
                                                width: 100px;
                                            }
                                        </style>
                                    </defs>
                                    <title>Untitled-1</title>
                                    <path class="cls-1"
                                        d="M88.65,40.39l-27,27.32a15.29,15.29,0,0,1-4.88,2.77,12.7,12.7,0,0,1-8-.4s3.43-2.11,4.5-7.83c0,0,1-5-.46-8.61,0,0-1.68-4.65-4.57-6.4l8.73-9.74a17.63,17.63,0,0,1-3.8-1l-7.23,8.12-7-7.86a13.58,13.58,0,0,1-3.73,1.29L45.88,49.61s3.45,2.59,4.29,6.32a10.7,10.7,0,0,1,0,5.71,15.3,15.3,0,0,1-4.29,6.63,9.62,9.62,0,0,1-3.94-5.41,14.08,14.08,0,0,1-.23-7.16,9.5,9.5,0,0,1,2.18-4.18s.82-1.29,0-2.14a1.76,1.76,0,0,0-2.46-.11,15.25,15.25,0,0,0-3.27,9.05s-.55,3.16,1.63,7.74a17.24,17.24,0,0,0,6,6,16.48,16.48,0,0,0,7.91,2,13.82,13.82,0,0,0,9.05-3.16L90,43.53A9.41,9.41,0,0,0,92,40.33c.3-1.06.3-1.06.3-3.82Z" />
                                    <path class="cls-1"
                                        d="M42.57,34.74a4.64,4.64,0,0,0-.65-.66,17.15,17.15,0,1,1,3.13-25.4A19.32,19.32,0,0,1,47,6.53,19.83,19.83,0,0,0,32.27,0C19.13,0,12.45,8.87,12.46,19.82a19.82,19.82,0,0,0,31.09,16.3,2.32,2.32,0,0,1-1-1.39" />
                                    <path class="cls-1"
                                        d="M59.49,0A19.81,19.81,0,0,0,41.9,10.68a14.07,14.07,0,0,1,1.9,2.7A17.1,17.1,0,1,1,50,34a13.11,13.11,0,0,0-1.49,2.31A19.82,19.82,0,1,0,59.49,0" />
                                    <path class="cls-1"
                                        d="M41.85,28.8c.11.21.21.43.33.64a7,7,0,0,1,.5-1A11,11,0,0,1,44.07,27c-.1-.22-.2-.45-.29-.68a13.76,13.76,0,0,1-1.93,2.49" />
                                    <path class="cls-1"
                                        d="M59.58,5.46A14.48,14.48,0,1,0,74.05,19.94,14.48,14.48,0,0,0,59.58,5.46m0,26.1A11.66,11.66,0,1,1,71.26,19.9,11.66,11.66,0,0,1,59.6,31.56" />
                                    <polygon class="cls-1"
                                        points="40.59 30.3 45.88 36.34 51.07 30.47 53.69 32.16 45.88 40.85 38.17 32.11 40.59 30.3" />
                                    <path class="cls-1"
                                        d="M59.58,11.19a8.69,8.69,0,1,0,8.69,8.69,8.69,8.69,0,0,0-8.69-8.69m0,14.95A6.16,6.16,0,1,1,65.77,20a6.16,6.16,0,0,1-6.16,6.16" />
                                    <path class="cls-1"
                                        d="M62.79,19.92a3.19,3.19,0,1,1-3.19-3.19,3.19,3.19,0,0,1,3.19,3.19" />
                                    <polygon class="cls-1"
                                        points="79.31 19.95 79.31 0.02 59.59 0 59.59 2.78 76.71 2.78 76.71 19.96 79.31 19.95" />
                                    <path class="cls-1"
                                        d="M32.18,5.46A14.48,14.48,0,1,0,46.66,19.94,14.48,14.48,0,0,0,32.18,5.46m0,26.25A11.73,11.73,0,1,1,43.9,20,11.73,11.73,0,0,1,32.17,31.72" />
                                    <path class="cls-1"
                                        d="M32.18,11.19a8.69,8.69,0,1,0,8.69,8.68,8.68,8.68,0,0,0-8.69-8.68m0,14.82a6.1,6.1,0,1,1,6.1-6.1,6.1,6.1,0,0,1-6.1,6.1" />
                                    <path class="cls-1"
                                        d="M29,19.92a3.19,3.19,0,1,0,3.19-3.19A3.19,3.19,0,0,0,29,19.92" />
                                    <polygon class="cls-1"
                                        points="12.46 19.98 12.46 0.03 32.17 0 32.17 2.84 15.02 2.84 15.02 19.98 12.46 19.98" />
                                    <path class="cls-1"
                                        d="M.28,36.34l29.88,31.5a11.07,11.07,0,0,0,4,2.66s1.58.85,5.57.06c0,0,1.17-.52,1.87.13,0,0,1.65,1.1,0,2.8,0,0-1.5,1-6.43.7a12.39,12.39,0,0,1-6-3L2.78,43.73A7.17,7.17,0,0,1,.66,40.3a16.3,16.3,0,0,1-.39-4" />
                                    <path class="cls-1"
                                        d="M87.69,23.7,60.28,51.33a8.82,8.82,0,0,0-1,1.29,1.74,1.74,0,0,0,0,1.45,1.18,1.18,0,0,0,.67.54,1.69,1.69,0,0,0,1.38-.18L92.16,23.7Z" />
                                    <path class="cls-1"
                                        d="M91.91,28.07,63.7,56.41A2.14,2.14,0,0,0,63,57.48a1.3,1.3,0,0,0,.05.94,1.37,1.37,0,0,0,1.11.77,2.29,2.29,0,0,0,1.38-.43l26.35-26.3Z" />
                                    <path class="cls-1"
                                        d="M77.19,23.7,76,27.12a15.93,15.93,0,0,1-8.51,8.56L55.74,47.54a1.73,1.73,0,0,0-.58.94,1.5,1.5,0,0,0,0,.7,1.46,1.46,0,0,0,1,1,1.75,1.75,0,0,0,1.19-.27L83.66,23.7Z" />
                                    <path class="cls-1"
                                        d="M35.61,47.54,24.33,36.19a15.39,15.39,0,0,1-8.27-8.32L14.33,23.7H7.69L34,49.89a1.75,1.75,0,0,0,1.19.27,1.45,1.45,0,0,0,1-1,1.5,1.5,0,0,0,0-.7,1.74,1.74,0,0,0-.58-.95" />
                                    <path class="cls-1"
                                        d="M4.47,23.7,31.88,51.33a8.82,8.82,0,0,1,1,1.29,1.74,1.74,0,0,1,0,1.45,1.18,1.18,0,0,1-.67.54,1.69,1.69,0,0,1-1.38-.18L0,23.7Z" />
                                    <path class="cls-1"
                                        d="M.25,28.07,28.46,56.41a2.14,2.14,0,0,1,.67,1.07,1.3,1.3,0,0,1-.05.94,1.37,1.37,0,0,1-1.11.77,2.29,2.29,0,0,1-1.38-.43L.25,32.45Z" />
                                    <path class="cls-1"
                                        d="M53.87,84.7l-9-8.93a1.88,1.88,0,0,1-.21-1.25c.17-.89,1.28-.85,1.28-.85a1.3,1.3,0,0,1,.85.23l11,10.84Z" />
                                    <path class="cls-1"
                                        d="M37.88,84.7l9-8.93a1.88,1.88,0,0,0,.21-1.25c-.17-.89-1.28-.85-1.28-.85a1.3,1.3,0,0,0-.85.23L34,84.74Z" />
                                    <path class="cls-1"
                                        d="M30.77,84.71l6.87-6.79a1.43,1.43,0,0,0,.18-1.27c-.14-.7-1.06-.87-1.06-.87a1.65,1.65,0,0,0-1.37.43L27,84.74Z" />
                                    <path class="cls-1"
                                        d="M60.91,84.65,54,77.85a1.43,1.43,0,0,1-.18-1.27c.14-.7,1.06-.87,1.06-.87a1.64,1.64,0,0,1,1.37.43l8.38,8.53Z" />
                                </svg></i>
                            <h2>Look in MENA</h2>
                            <h4>اكتشف الفرص بمكانٍ واحد</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container desktophomepage">
                <div class="text-center">
                    <h2>عن ماذا تبحث؟</h2>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <p class="text-center">
                            <form id="search-bar_form">

                                <div class="search-bar_content">
                                    <input id="search_input" type="text" placeholder="ابحث في الموقع.."><button
                                        class="btn-search" type="submit"><i class="fa fa-search"></i></button>
                                </div>

                            </form>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <ul class="services-list items-7 wow "
                        style="visibility: visible; animation-name: fadeInUp">

                        <div class="col-sm-3">
                            <li class="modall">
                                <div class="service-box style-5">
                                    <a class="waves" href="#recent-scholars">
                                        <div class="service-box-content"> <i class="fa fa-university"></i>
                                            <h5>منحة جامعية</h5>
                                            <span class="available_items service_box_scholar_num"><span
                                                    class="scholar_num_available"><?php echo($scholarships_count) ?></span> منحة
                                                متاحة</span>
                                        </div>
                                    </a>
                                    <!-- POPUP -->
                                    <div id="recent-scholars" class="popup"
                                        style=" width: 700px;height: auto; direction: rtl;">
                                        <div class="container">
                                            <div class="popup-box">
                                                <div class="pop_up_img">
                                                    <img src="./assets/images/pop_up.jpg">
                                                    <div class="popup-overlay-color"></div>
                                                </div>
                                                <div class="pop_up_text">
                                                    <div class="popup_heading">
                                                        <h3> اﻟﻤﻨﺢ اﻟﺪﺭاﺳﻴﺔ</h3>
                                                    </div>
                                                    <div class="popup_sub_heading">
                                                        <span>اﺧﺘﺮ اﻟﺪﺭﺟﺔ اﻟﺪﺭاﺳﻴﺔ ﻭاﻛﺘﺸﻒ:</span>
                                                    </div>
                                                    <div class="popup_content">
                                                        <div>
                                                            <a class="btn btn-default-1 waves"
                                                                href="https://lookinmena.com/scholarships_categories/%D8%A8%D9%83%D8%A7%D9%84%D9%88%D8%B1%D9%8A%D9%88%D8%B3/">بكالوريوس</a><br>
                                                        </div>
                                                        <div>
                                                            <a class="btn btn-default-1 waves"
                                                                href="https://lookinmena.com/scholarships_categories/master/">ماجستير</a><br>
                                                        </div>
                                                        <div>
                                                            <a class="btn btn-default-1 waves"
                                                                href="https://lookinmena.com/scholarships_categories/%D8%AF%D9%83%D8%AA%D9%88%D8%B1%D8%A7%D9%87/">دكتوراه</a><br>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                        <div class="col-sm-3">
                            <li class="modall">
                                <div class="service-box style-5">
                                    <a class="waves search"
                                        href="https://lookinmena.com/online_activities_categories/all/">
                                        <div class="service-box-content">
                                            <i class="fa fa-paint-brush"></i>
                                            <h5>مسابقة عالمية</h5>
                                            <span class="available_items service_box_compete_num"><span
                                                    class="compete_num_available"><?php echo($online_activities_count) ?></span> مسابقة
                                                متاحة</span>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </div>
                        <div class="col-sm-3">
                            <li class="modall">
                                <div class="service-box style-5">
                                    <a class="waves" href="https://lookinmena.com/universities-profile/">
                                        <div class="service-box-content"><i class="fa fa-graduation-cap"></i>
                                            <h5>جامعة في الMENA</h5>
                                            <span class="available_items service_box_uni_num"><span
                                                    class="uni_num_available"><?php echo($universities_profiles_count) ?></span> جامعة متاحة</span>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </div>
                        <div class="col-sm-3">
                            <li class="modall">
                                <div class="service-box style-5">
                                    <a class="waves" href="https://lookinmena.com/articles/">
                                        <div class="service-box-content"> <i class="fa fa-file"></i>
                                            <h5>مقالات</h5>
                                            <span class="available_items service_box_articles_num"><span
                                                    class="articles_num_available"><?php echo($articles_count) ?></span> مقال
                                                متاح</span>
                                        </div>
                                    </a>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <!-- tabs -->
            <!-- col -->


            <!-- mobile view -->
            <div class="container mobilehomepage">
                <div class="row">
                    <div class="col">
                        <div class="tabs style-3 mobile-home-list">
                            <div class="list_header">
                                <h3>عن ماذا تبحث؟</h3>
                            </div>
                            <div class="row">
                                <form id="search-bar_form">
                                    <div class="search-bar_content">
                                        <input id="search_input" type="text" placeholder="ابحث في الموقع..">
                                        <button class="btn-search" type="submit"><i
                                                class="fa fa-search "></i></button>
                                    </div>
                                </form>
                            </div>
                            <div class="choose_more">
                                <h4>او اختر من هنا:</h4>
                            </div>
                            <ul class="mobile-home-list">
                                <li class="modall">
                                    <a href="#recent-scholars">
                                        <h4><i class="fa fa-arrow-circle-left"></i> منحة دراسية <span
                                                class="available_mobile">(<span
                                                    class="scholar_num_available"><?php echo($scholarships_count) ?></span>)</span></h4>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://lookinmena.com/online_activities_categories/all/">
                                        <h4><i class="fa fa-arrow-circle-left"></i> مسابقة عالمية <span
                                                class="available_mobile">(<span
                                                    class="compete_num_available"><?php echo($online_activities_count) ?></span>)</span>
                                        </h4>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://lookinmena.com/universities-profile/">
                                        <h4><i class="fa fa-arrow-circle-left"></i>جامعة في الMENA<span
                                                class="available_mobile">(<span
                                                    class="uni_num_available"><?php echo($universities_profiles_count) ?></span>)</span></h4>

                                    </a>
                                </li>
                                <li>
                                    <a href="https://lookinmena.com/articles/">
                                        <h4><i class="fa fa-arrow-circle-left"></i> مقالات <span
                                                class="available_mobile">(<span
                                                    class="articles_num_available"><?php echo($articles_count) ?></span>)</span></h4>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- row -->
    </section>








    <div class="container">
        <div class="row">
            <div class="col-sm-12">
                <div class="title">
                <h3>فرص مميزة</h3>
                </div>
                <!-- headline --> 

            </div>
        <!-- col --> 
        </div>
    <!-- row --> 
    </div>

    <div class="container">
        <div class="row" id="last_posts">

            <div class="col-sm-4" ng-repeat="last_post in last_posts.scholarships">
                <div class="story">
                   <a href="{{last_post.link}}">
                        <div class="story_container">
                            <div class="top" style="background: url({{last_post.image}}) no-repeat center center; background-size: cover;"></div>
                            <div class="bottom">
                                <div class="left">
                                    <div class="story_details">
                                        <h5 ng-bind-html="last_post.post_title"></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>

                   <div class="inside inside-blue">
                      <div class="icon"><i class="fa fa-expand"></i></div>
                      <div class="story_contents">
                            <span ng-show="last_post.study_language != ''">&nbsp;&nbsp; لغة الدراسة: {{last_post.study_language}}<br><br></span>
                            <span ng-show="post.expire_date != '' && last_post.expire_date != false">&nbsp;&nbsp; آخر موعد للتقديم: {{last_post.expire_date | lim_date}}</span>
                      </div>
                   </div>
                </div>
            </div>

            <div class="col-sm-4" ng-repeat="last_post in last_posts.online_activities">
                <div class="story">
                  
                    <a href="{{last_post.link}}">
                        <div class="story_container">
                            <div class="top" style="background: url({{last_post.image}}) no-repeat center center; background-size: cover;"></div>
                            <div class="bottom">
                                <div class="left">
                                    <div class="story_details">
                                        <h5 ng-bind-html="last_post.post_title"></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                   <div class="inside inside-grey">
                      <div class="icon"><i class="fa fa-expand"></i></div>
                      <div class="story_contents">
                            <span ng-show="last_post.price != ''"><i class="fa fa-money"></i> رسم الاشتراك:
                            {{last_post.price}}<br><br></span>
                            <span ng-show="last_post.last_date != '' && last_post.last_date != false"><i class="fa fa-clock-o"></i> آخر موعد للتقديم:
                            {{last_post.last_date | lim_date}}<br><br></span>
                            <span ng-show="last_post.result_expected_date != '' && last_post.result_expected_date != false"><i class="fa fa-clock-o"></i> التاريخ المتوقع لإعلان النتيجة:
                            {{last_post.result_expected_date | lim_date}}<br></span>
                      </div>
                   </div>
                </div>
                
            </div>

        
        </div>
        <div id="loading_posts"></div>
    </div>

   <br>
   <br>

    <!-- PAGE CONTENT --> 

</div>
<!-- MAIN CONTAINER --> 

<?php get_footer() ?>