# AURA ProGuard Rules

# Keep AURA classes
-keep class com.zachary.aura.** { *; }

# Keep Android framework classes
-keep public class android.** { *; }

# Keep Kotlin classes
-keep class kotlin.** { *; }
-keep class kotlinx.** { *; }

# Keep coroutines
-keep class kotlinx.coroutines.** { *; }

# Keep ML Kit classes
-keep class com.google.mlkit.** { *; }

# Keep Firebase classes
-keep class com.google.firebase.** { *; }

# Keep Retrofit
-keep class retrofit2.** { *; }
-keep interface retrofit2.** { *; }
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# Keep Gson
-keep class com.google.gson.** { *; }

# Keep Room
-keep class androidx.room.** { *; }

# Keep AndroidX
-keep class androidx.** { *; }

# Preserve line numbers for debugging
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Remove logging
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** v(...);
    public static *** i(...);
}
