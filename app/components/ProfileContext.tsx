"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { projects, teams } from "../data";

export type RoleProfile = "Secretaría" | "Dirección" | "DOE" | "Académico";

const profileToTeam = {
  "Secretaría": "Secretaría",
  "Dirección": "Dirección",
  DOE: "DOE",
  "Académico": "Académico",
} as const;

type ProfileContextType = {
  profile: RoleProfile;
  setProfile: (profile: RoleProfile) => void;
  visibleTeam: string;
  visibleProjects: typeof projects;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<RoleProfile>(() => {
    if (typeof window === "undefined") return "Secretaría";
    return (localStorage.getItem("pucara.profile") as RoleProfile | null) ?? "Secretaría";
  });

  const updateProfile = (next: RoleProfile) => {
    setProfile(next);
    localStorage.setItem("pucara.profile", next);
  };

  const value = useMemo(() => {
    const visibleTeam = profileToTeam[profile];
    const visibleProjects = projects.filter((project) => project.team === visibleTeam);
    return { profile, setProfile: updateProfile, visibleTeam, visibleProjects };
  }, [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used inside ProfileProvider");
  return context;
}

export const roleProfiles: RoleProfile[] = ["Secretaría", "Dirección", "DOE", "Académico"];

export const visibleTeams = teams.map((team) => team.shortName);
