import Image from 'next/image';

export interface UserProfileProps {
  name: string;
  imageUrl: string;
  imageAlt?: string;
}

export function UserProfile({
  name,
  imageUrl,
  imageAlt = `${name} profile picture`,
}: UserProfileProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={40}
        height={40}
        unoptimized
        className="h-10 w-10 shrink-0 rounded-full border-2 border-primary object-cover"
      />
      <span className="text-sm font-semibold text-slate-900">{name}</span>
    </div>
  );
}
