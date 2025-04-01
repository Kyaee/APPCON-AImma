import { supabase } from "@/config/supabase";

export const createNewRoadmap = async (roadmap) => {
  // Insert roadmap
  const { data: roadmapData, error: roadmapError } = await supabase
    .from("roadmaps")
    .insert([
      {
        roadmap_name: roadmap.roadmap_name,
        description: roadmap.description,
        // Add other relevant roadmap fields here
      },
    ])
    .select();

  if (roadmapError) throw roadmapError;

  const roadmapId = roadmapData[0].id;

  // Insert lessons with the roadmap_id reference
  if (roadmap.lessons?.length > 0) {
    const lessonsToInsert = roadmap.lessons.map((lesson) => ({
      roadmap_id: roadmapId,
      lesson_name: lesson.lesson_name,
      duration: lesson.duration,
      assessment: lesson.assessment,
      created_at: lesson.created_at || new Date().toISOString(),
    }));

    const { error: lessonsError } = await supabase
      .from("lessons")
      .insert(lessonsToInsert);

    if (lessonsError) throw lessonsError;
  }

  return roadmapData[0];
};
