from rest_framework.serializers import ModelSerializer
from .models import Workout, WorkoutRoutine, WorkoutRoutineDay, WorkoutRoutineDayMuscle, WorkoutRoutineDayMuscleExercise

class WorkoutRoutineDayMuscleExerciseSerializer(ModelSerializer):
    class Meta:
        model = WorkoutRoutineDayMuscleExercise
        fields = ["id", "exercise"]

class WorkoutRoutineDayMuscleSerializer(ModelSerializer):
    exercises = WorkoutRoutineDayMuscleExerciseSerializer(many=True)
    class Meta:
        model = WorkoutRoutineDayMuscle
        fields = ["id", "muscle", "exercises"]

class WorkoutRoutineDaySerializer(ModelSerializer):
    muscles = WorkoutRoutineDayMuscleSerializer(many=True)
    class Meta:
        model = WorkoutRoutineDay
        fields = ["id", "day", "muscles"]

class WorkoutRoutineSerializer(ModelSerializer):
    days = WorkoutRoutineDaySerializer(many=True)
    class Meta:
        model = WorkoutRoutine
        fields = ["id", "workout_type", "days"]

class WorkoutSerializer(ModelSerializer):
    workout_routines = WorkoutRoutineSerializer(many=True)
    class Meta:
        model = Workout
        fields = ["workout_routines"]

class WorkoutRoutineTableSerializer(ModelSerializer):
    class Meta:
        model = WorkoutRoutine
        fields = ["id", "workout_type"]

# class AnExerciseSerializer(ModelSerializer):
#     class Meta:
#         model = WorkoutRoutineDayMuscleExercise
