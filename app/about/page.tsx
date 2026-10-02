import type { Metadata } from "next";
import FirmPage from "../components/FirmPage";
export const metadata: Metadata = { title: "O escritório" };
export default function About() { return <FirmPage page="about"/>; }
