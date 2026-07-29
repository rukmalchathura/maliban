// Supabase Client Integration for Maliban Wovens Audit Application

export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

// Default fallback configuration (can be updated via UI or environment variables)
export const DEFAULT_SUPABASE_CONFIG: SupabaseConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-project.supabase.co',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'
};

export class SupabaseService {
  private url: string;
  private key: string;

  constructor(config: SupabaseConfig = DEFAULT_SUPABASE_CONFIG) {
    this.url = config.supabaseUrl;
    this.key = config.supabaseAnonKey;
  }

  // Check if live Supabase credentials are configured
  public isConfigured(): boolean {
    return (
      Boolean(this.url) &&
      Boolean(this.key) &&
      !this.url.includes('your-supabase-project')
    );
  }

  // Save audit data to Supabase database
  public async saveAudit(auditData: any): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!this.isConfigured()) {
      console.warn('Supabase credentials not set. Operating in local storage mode.');
      return { success: true, id: auditData.id || 'local-audit-id' };
    }

    try {
      const response = await fetch(`${this.url}/rest/v1/audits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          title: auditData.facility.companyName + ' - Audit',
          facility_name: auditData.facility.companyName,
          facility_location: auditData.facility.location,
          auditor_name: auditData.facility.auditorName,
          audit_date: auditData.facility.auditDate,
          total_score: auditData.overallScore,
          earned_points: auditData.earnedPoints,
          max_applicable_points: auditData.maxPoints,
          critical_findings_count: auditData.criticalCount,
          major_findings_count: auditData.majorCount,
          overall_rating: auditData.rating,
          site_photos: auditData.facility.siteCoverPhotos
        })
      });

      if (!response.ok) {
        throw new Error(`Supabase REST error: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, id: data[0]?.id };
    } catch (err: any) {
      console.error('Failed to sync with Supabase:', err);
      return { success: false, error: err.message };
    }
  }

  // Log automated email distribution in Supabase
  public async logEmailDistribution(auditId: string, recipients: string[], subject: string): Promise<boolean> {
    if (!this.isConfigured()) return true;

    try {
      await fetch(`${this.url}/rest/v1/email_audit_logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': this.key,
          'Authorization': `Bearer ${this.key}`
        },
        body: JSON.stringify({
          audit_id: auditId,
          recipients,
          subject,
          status: 'SENT'
        })
      });
      return true;
    } catch (err) {
      console.error('Error logging email to Supabase:', err);
      return false;
    }
  }
}

export const supabaseService = new SupabaseService();
