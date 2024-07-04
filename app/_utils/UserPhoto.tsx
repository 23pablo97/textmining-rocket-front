import React from 'react';
import { User } from '@/app/_utils/types/User';

interface UserProfileImageProps {
  user: User | null;
}

const getFirstLetterCapitalized = (name: string) => name.charAt(0).toUpperCase();

const UserProfileImage: React.FC<UserProfileImageProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <>
        {user && user.image_url ? (
            <img className="object-cover w-full h-full" src={user.image_url} alt="Profile" />
        ) : (
            <span className="font-medium text-gray-600">
                {getFirstLetterCapitalized(user.first_name)}
                {getFirstLetterCapitalized(user.last_name)}
            </span>
        )}
    </>
  );
};

export default UserProfileImage;