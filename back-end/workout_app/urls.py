from django.urls import path
from .views import AMuscle, Muscle, GenerateWorkoutPlan, GenerateCardio, AllWorkoutRoutines, AWorkoutRoutine, AllWorkouts, AnExercise

urlpatterns = [
    path('muscle/<str:muscle>/', Muscle.as_view(), name='muscle'),
    path('amuscle/<str:muscle>/', AMuscle.as_view(), name='amuscle'),
    path('cardio/', GenerateCardio.as_view(), name='gen_cardio'),
    path('userplans/', AllWorkouts.as_view(), name='all_user_workouts'),
    path('userplans/all/', AllWorkoutRoutines.as_view(), name='all_workout_routines'),
    path('userplans/<int:id>/', AWorkoutRoutine.as_view(), name='a_workout_routine'),
    path('userplans/delete/<int:id>/', AWorkoutRoutine.as_view(), name='a_workout_routine'),
    path('userplans/generate/<str:days>/', GenerateWorkoutPlan.as_view(), name='gen_workout_plan'),
    path('userplans/regenerate/<int:id>/', AnExercise.as_view(), name='regen_exercise'),
]