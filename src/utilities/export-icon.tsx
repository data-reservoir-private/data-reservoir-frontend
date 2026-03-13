import { VscJson } from "react-icons/vsc";
import { RiCodeSSlashFill } from "react-icons/ri";
import { FaFileCsv } from "react-icons/fa6";
import { SiYaml } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiSqlite } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { SiApacheparquet } from "react-icons/si";
import { FaFileExcel } from "react-icons/fa";
import { ExportType } from "@/model/dto/export";

export const ALL_EXPORTS_COMPLETE: ExportType[] = ['json', 'ndjson', 'csv', 'tsv', 'xml', 'yaml', 'html', 'postgresql', 'sql_server', 'sqlite', 'parquet', 'xlsx'];

export function getTypeIcon(exportType: ExportType) {
  switch (exportType) {
    case 'json': return <VscJson />;
    case 'ndjson': return <VscJson />;
    case 'xml': return <RiCodeSSlashFill />;
    case 'csv': return <FaFileCsv />;
    case 'tsv': return <FaFileCsv />;
    case 'yaml': return <SiYaml />;
    case 'postgresql': return <BiLogoPostgresql />;
    case 'sql_server': return <DiMsqlServer />;
    case 'sqlite': return <SiSqlite />;
    case 'html': return <FaHtml5 />;
    case 'parquet': return <SiApacheparquet />;
    case 'xlsx': return <FaFileExcel />;
    default: return <></>;
  }
}