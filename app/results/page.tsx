import type { Metadata } from "next";
import FirmPage from "../components/FirmPage";
export const metadata: Metadata = { title: "Resultados" };
export default function Results() { return <FirmPage page="results"/>; }
