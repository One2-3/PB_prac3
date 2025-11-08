// src/patterns/builder.ts

export type ReportFormat = 'pdf' | 'html';

export interface ReportConfig {
  title: string;
  includeChart: boolean;
  includeSummary: boolean;
  format: ReportFormat;
}

export class ReportConfigBuilder {
  private _title = '';
  private _includeChart = true;
  private _includeSummary = true;
  private _format: ReportFormat = 'pdf';

  setTitle(title: string): this {
    this._title = title;
    return this;
  }

  includeChart(include: boolean): this {
    this._includeChart = include;
    return this;
  }

  includeSummary(include: boolean): this {
    this._includeSummary = include;
    return this;
  }

  setFormat(format: ReportFormat): this {
    this._format = format;
    return this;
  }

  build(): ReportConfig {
    if (!this._title.trim()) {
      throw new Error('리포트 제목은 필수입니다.');
    }

    return {
      title: this._title,
      includeChart: this._includeChart,
      includeSummary: this._includeSummary,
      format: this._format,
    };
  }
}
