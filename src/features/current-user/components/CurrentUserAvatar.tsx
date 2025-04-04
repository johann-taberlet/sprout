"use client";

import { useCurrentUserImage } from "@/features/current-user/hooks/useCurrentUserImage";
import { useCurrentUserName } from "@/features/current-user/hooks/useCurrentUserName";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/features/core/components/ui/avatar";

export const CurrentUserAvatar = () => {
  const profileImage = useCurrentUserImage();
  const name = useCurrentUserName();
  const initials = name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <Avatar>
      {profileImage && (
        <AvatarImage src={profileImage} alt={initials ?? "User avatar"} />
      )}
      <AvatarFallback>{initials ?? "?"}</AvatarFallback>
    </Avatar>
  );
};
