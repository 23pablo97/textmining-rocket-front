import React from 'react';
import Image from 'next/image';
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
        <Image 
          className="object-cover w-full h-full"
          src={user.image_url.replace('http://127.0.0.1:8000', 'http://rocket-api:8000')}
          alt="Profile"
          layout="fill"
          objectFit="cover"
        />
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