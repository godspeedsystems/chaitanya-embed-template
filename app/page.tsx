'use client';

import { useAppContext } from '@/context/app';

export default function Home() {
  const { agent } = useAppContext();
  return <>{agent?.name}</>;
}
