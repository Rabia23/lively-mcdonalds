from django.conf.urls import patterns, url
from apps import views

__author__ = 'aamish'


urlpatterns = patterns('',
                       url(r'^login/$', views.LoginView.as_view()),
                       url(r'^overall_feedback/$', views.OverallFeedbackView.as_view()),
                       url(r'^feedback_analysis/$', views.FeedbackAnalysisView.as_view()),
                       url(r'^feedback_analysis_breakdown/$', views.FeedbackAnalysisBreakdownView.as_view()),
                       url(r'^overall_rating/$', views.OverallRatingView.as_view()),
                       url(r'^category_performance/$', views.CategoryPerformanceView.as_view()),
                       url(r'^positive_negative_feedback/$', views.PositiveNegativeFeedbackView.as_view()),
                       url(r'^comments/$', views.CommentsView.as_view()),
                       url(r'^map_view/$', views.MapView.as_view()),
                       url(r'^feedback_segmentation/$', views.FeedbackSegmentationView.as_view()),
                       url(r'^top_concerns/$', views.TopConcernsView.as_view()),
                       url(r'^segmentation_rating/$', views.SegmentationRatingView.as_view()),
                       url(r'^action_taken/$', views.ActionTakenView.as_view()),
                       url(r'^action_analysis/$', views.ActionAnalysisView.as_view()),
                       url(r'^top_charts/$', views.TopChartsView.as_view()),
                       url(r'^top_rankings/$', views.TopRankingsView.as_view()),
                       url(r'^complaint_analysis/$', views.ComplaintAnalysisView.as_view()),
)


