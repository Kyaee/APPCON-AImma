import { useState, useRef } from "react";
import { Edit, Clock3, BookOpen } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
CardTitle,
} from "@/components/ui/card";
import { CircleProgressBar } from "@/components/profile/CircleProgress";
import useSkinStore from "@/store/useSkinStore";
import LevelRewards from "@/components/features/level-rewards/LevelRewards";
import { postPrompt2 } from "@/api/INSERT";
import Loading from "@/routes/Loading";
import Modal from "../crop-image/Modal";

const ProfileDetails = ({
  initialImageUrl,
  name,
  level,
  experience,
  totalExperience,
  lessonData,
  hours,
  withAssessment,
  progress,
  isOpen,
  onOpenChange,
  userId,
  renderButton, // Don't render the button in the component
}) => {
  const [isLoading, setLoading] = useState(false);
  const FileInputCover = useRef(null);
  const [isCoverImageUrl, setCoverImageUrl] = useState(null);

  const avatarUrl = useRef(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  // Get the selected skin from the store
  const { selectedSkin } = useSkinStore();

  const handleImageCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLessonSelect = (lesson) => {
    setLoading(true);
    postPrompt2(
      lesson.lesson_name,
      lesson.id,
      lesson.lesson_category,
      lesson.lesson_difficulty,
      lesson.gems,
      lesson.exp,
      lesson.lesson_duration,
      lesson.assessment,
      lesson.progress
    );
    onToggle();
  };

  if (isLoading) return <Loading generate_lesson={true} />;

  return (
    <section className="relative flex justify-between h-80 w-full pt-50 px-10 lg:px-30 xl:px-40 rounded-md border-b-2 border-foreground">
      {/* BACKGROUND */}
      <img
        src={isCoverImageUrl}
        className="absolute right-0 top-0 h-full w-full bg-gradient-to-bl from-green-300 to-amber-300 -z-10 object-cover object-center"
      />
      {/* CHANGE COVER PHOTO */}
      <button
        onClick={() => FileInputCover.current.click()}
        className=" cursor-pointer absolute flex gap-2 items-center font-semibold text-foreground left-5 top-5 z-50 "
      >
        <div className="bg-light-brown p-2 rounded-full text-black">
          <Edit />
        </div>
        Edit Cover
      </button>

      {/* {isClick && (
        <div className="top-0 left-0 fixed h-full w-full z-50">
          <div className="top-0 left-0 fixed h-full w-full bg-foreground opacity-30 z-50"></div>
          <div className="fixed transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-background p-8 rounded-lg">
            <ImageCropper />
          </div>
        </div>
      )} */}

      {modalOpen && (
        <Modal
          updateAvatar={updateAvatar}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {/* PROFILE DETAILS */}
      <div className="flex w-full pb-5 h-full max-w-xl text-left">
        <button
          className="relative mr-7 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <div className="size-37 rounded-full overflow-hidden border-3 border-foreground">
            <img
              src={avatarUrl.current}
              alt="profile"
              className="w-full h-full object-cover object-center bg-blue-400"
            />
          </div>
          <div className="absolute top-25 right-0 bg-blue-500 rounded-full p-2">
            <Edit />
          </div>
        </button>

        <div className="h-full flex flex-col justify-end flex-1">
          <h2 className="text-4xl text-balance text-black font-bold leading-tighter">
            {name}
          </h2>
          <p className="flex justify-between items-center">
            <span className="text-gray-600">Level {level}</span>
            <span className="ml-2 text-sm text-gray-600">
              {experience} / 100 EXP
            </span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3.5 dark:bg-gray-700 border-2 border-foreground">
            <div
              className="bg-blue-500 h-full rounded-full border-r-2 border-foreground"
              style={{ width: `${(experience / totalExperience) * 100}%` }}
            ></div>
            <LevelRewards
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              userId={userId}
              renderButton={renderButton}
            />
          </div>
        </div>
      </div>

      {/* CONTINUE LEARNING */}
      {lessonData && (
        <div className="relative w-full">
          <Card className="absolute min-w-xs max-w-sm right-0 top-3 shadow-2xl p-0 gap-0 bg-dark-brown hover:bg-brown transition ease-in">
            <div className="relative flex items-center justify-between rounded-t-xl bg-card border-b-2 border-foreground">
              <CardHeader className="pt-5 pb-2 *:py-0.5">
                <CardTitle className="text-wrap leading-tight">
                  {lessonData[0]?.lesson_name}
                </CardTitle>
                <div className="fle x gap-3 *:flex *:items-center *:gap-2">
                  <CardDescription>
                    <Clock3 size={16} />
                    {lessonData[0]?.lesson_duration}
                  </CardDescription>
                  <CardDescription>
                    <BookOpen size={16} />
                    {lessonData[0]?.assessment
                      ? "With Assessment"
                      : "No Assessment"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CircleProgressBar
                className="size-15"
                value={lessonData[0]?.progress}
              />
              <img
                src={selectedSkin.image}
                alt="capybara"
                className="h-35 absolute -left-21 -bottom-10 z-0"
              />
            </div>
            <div
              onClick={() => handleLessonSelect(lessonData[0])}
              className="text-center py-3 *:text-sm *:text-white"
            >
              <p>CONTINUE LEARNING</p>
            </div>
          </Card>
        </div>
      )}


      <input
        type="file"
        accept="image/*"
        ref={FileInputCover}
        style={{ display: "none" }}
        onChange={handleImageCoverChange}
      />
    </section>
  );
};

export default ProfileDetails;
