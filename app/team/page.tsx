import type { Metadata } from "next";
import FirmPage from "../components/FirmPage";
export const metadata: Metadata = { title: "A equipa" };
export default function Team() { return <FirmPage page="team"/>; }
