import { useMemo, useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import styles from './Pricing.module.css';

type ChargeType =
  | 'Hourly'
  | 'Daily'
  | 'Per Trip'
  | 'Per Km'
  | 'Per Item'
  | 'Per Message'
  | 'Per Transaction'
  | 'Percentage'
  | 'Per Unit'
  | 'Per License'
  | 'Per Device'
  | 'Per Month'
  | 'Rate'
  | 'Price on Request';

interface PricingItem {
  name: string;
  description: string;
  price: string;
  chargeType: ChargeType;
}

interface PricingSection {
  id: string;
  title: string;
  subtitle: string;
  color: 'primary' | 'secondary' | 'tertiary';
  items: PricingItem[];
}

const pricingSections: PricingSection[] = [
  {
    id: '1.1',
    title: '1.1 Out of Scope (Ad Hoc Hourly Rates)',
    subtitle: 'Professional support resources charged per hour',
    color: 'primary',
    items: [
      { name: 'Project Manager', description: 'Provides project governance, planning, stakeholder coordination, and delivery oversight for municipal implementations.', price: 'R 1,200.00', chargeType: 'Hourly' },
      { name: 'Junior Consultant', description: 'Supports configuration, documentation, and day-to-day functional assistance under senior supervision.', price: 'R 950.00', chargeType: 'Hourly' },
      { name: 'Consultant', description: 'Delivers functional advisory, process alignment, and platform optimization across municipal workflows.', price: 'R 1,200.00', chargeType: 'Hourly' },
      { name: 'Senior Consultant', description: 'Leads complex functional streams and high-impact solution design for finance and governance requirements.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Principal Consultant', description: 'Provides strategic guidance, architecture-level decisions, and quality assurance on critical engagements.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Project Support Officer', description: 'Coordinates administrative project controls, reporting, issue tracking, and implementation logistics.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Business Analyst', description: 'Maps requirements, analyzes processes, and translates municipal business needs into system-ready specifications.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Change Management Specialist', description: 'Drives adoption through communication plans, training support, and transition-readiness activities.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Team Lead', description: 'Leads implementation teams, resolves blockers, and ensures technical and functional execution quality.', price: 'R 950.00', chargeType: 'Hourly' },
      { name: 'Subject Matter Expert', description: 'Offers deep domain expertise for specialist topics such as compliance, controls, and municipal operations.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Senior Implementation Consultant', description: 'Owns end-to-end deployment workstreams and advanced system rollout support.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Implementation Consultant', description: 'Executes system setup, testing support, and go-live readiness tasks for new deployments.', price: 'R 1,200.00', chargeType: 'Hourly' },
      { name: 'Junior Implementation Consultant', description: 'Assists implementation activities including configuration updates, validation, and user support.', price: 'R 950.00', chargeType: 'Hourly' },
      { name: 'Enterprise Architect', description: 'Designs integration-ready enterprise solution architecture aligned to municipal technology landscapes.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Senior Developers', description: 'Builds and customizes advanced features, integrations, and technical enhancements.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Junior Developers', description: 'Supports coding, fixes, and extension work under defined architectural standards.', price: 'R 1,200.00', chargeType: 'Hourly' },
      { name: 'Senior Data Migration Specialist', description: 'Leads migration strategy, mapping quality, and risk-controlled data cutover execution.', price: 'R 1,400.00', chargeType: 'Hourly' },
      { name: 'Junior Data Migration Specialist', description: 'Performs migration preparation, cleansing support, and validation tasks.', price: 'R 1,200.00', chargeType: 'Hourly' },
      { name: 'ICT Specialist', description: 'Provides infrastructure, network, security, and environment-level technical support.', price: 'R 1,200.00', chargeType: 'Hourly' },
      { name: 'Trainer', description: 'Delivers practical user training and role-based capability enablement sessions.', price: 'R 1,400.00', chargeType: 'Hourly' },
    ],
  },
  {
    id: '1.2',
    title: '1.2 Travel, Accommodation and Subsistence',
    subtitle: 'Operational logistics and travel-related costs',
    color: 'secondary',
    items: [
      { name: 'Per Kilometre Rate for Travel', description: 'Distance-based billing for approved project travel in support of municipal delivery.', price: 'R 5.00', chargeType: 'Per Km' },
      { name: 'Accommodation and Subsistence per Day', description: 'Daily lodging and subsistence allowance for on-site project resources.', price: 'R 1,720.00', chargeType: 'Daily' },
      { name: 'Flight Costs per Return Flight', description: 'Actual return flight charge applied when air travel is required for service delivery.', price: 'R 4,700.00', chargeType: 'Per Trip' },
      { name: 'Car Hire Costs per Day', description: 'Daily rental charge for project-related vehicle usage during on-site assignments.', price: 'R 800.00', chargeType: 'Daily' },
      { name: 'Car Refuels', description: 'Fuel costs incurred during approved travel for project execution.', price: 'R 800.00', chargeType: 'Per Item' },
      { name: 'Point-to-Point (to & from airport)', description: 'Ground transfer cost for airport routes tied to implementation or support travel.', price: 'R 1,800.00', chargeType: 'Per Trip' },
      { name: 'Travel Time', description: 'Charge for productive professional time consumed during approved travel.', price: 'R 950.00', chargeType: 'Hourly' },
      { name: 'Miscellaneous', description: 'Approved out-of-pocket operational costs not covered under standard travel line items.', price: 'R 650.00', chargeType: 'Per Item' },
    ],
  },
  {
    id: '1.3',
    title: '1.3 Service Schedule E/G',
    subtitle: 'Disaster recovery license and storage charges',
    color: 'tertiary',
    items: [
      { name: 'Additional Data Storage (per GB)', description: 'Supplementary storage capacity for backup retention and disaster recovery continuity.', price: 'Price on request', chargeType: 'Per Unit' },
      { name: 'Additional Licenses (per license)', description: 'Extra software license allocation for growth in users, functions, or environments.', price: 'Price on request', chargeType: 'Per License' },
    ],
  },
  {
    id: '1.4',
    title: '1.4 Service Schedule F/T',
    subtitle: 'Electronic and asset meter reading device charges',
    color: 'primary',
    items: [
      { name: 'Additional Device (per device)', description: 'Additional field device charge for meter reading and asset data collection operations.', price: 'Price on request', chargeType: 'Per Device' },
      { name: 'Additional SIM/Data Charge (per unit/per month)', description: 'Recurring connectivity fee for field devices requiring mobile data services.', price: 'Price on request', chargeType: 'Per Month' },
    ],
  },
  {
    id: '1.5',
    title: '1.5 Service Schedule H',
    subtitle: 'Statement printing and distribution related variable charges',
    color: 'secondary',
    items: [
      { name: 'Statements Printed & Mail Processed (mailers)', description: 'End-to-end print, insert, and mail handling service for municipal statement distribution.', price: 'R 1.91', chargeType: 'Per Item' },
      { name: 'Statements Hosted Online for Online Viewing (1000)', description: 'Bulk digital statement hosting for residents to access statements online.', price: 'R 0.17', chargeType: 'Per Item' },
      { name: 'Emailed Statements', description: 'Electronic statement delivery to customer email addresses.', price: 'R 0.33', chargeType: 'Per Item' },
      { name: '160-character SMS sent', description: 'Single outbound short message used for alerts, reminders, and billing communication.', price: 'R 0.40', chargeType: 'Per Message' },
      { name: 'DL Window Envelope', description: 'Windowed envelope material cost for physical statement mailing.', price: 'R 0.46', chargeType: 'Per Item' },
      { name: 'DL Plastic Envelopes', description: 'Plastic envelope packaging for protected statement distribution.', price: 'R 0.30', chargeType: 'Per Item' },
      { name: 'Nixies / Return Mail Scanned & Reported', description: 'Processing and reporting of undelivered returned mail items for corrective action.', price: 'R 0.30', chargeType: 'Per Item' },
      { name: 'A4 80gsm Bond Paper', description: 'Paper consumable cost used for statement and communication printing.', price: 'R 0.31', chargeType: 'Per Item' },
      { name: 'Mail Processing', description: 'Operational handling cost for sorting, batching, and outbound dispatch workflows.', price: 'R 0.35', chargeType: 'Per Item' },
      { name: 'Laser Printing Variable (personalised) x 2 (duplex)', description: 'Double-sided personalized laser printing for high-volume statement output.', price: 'R 0.32', chargeType: 'Per Item' },
      { name: 'Computer Processing', description: 'System processing charge for generating, preparing, and packaging communication data.', price: 'R 0.35', chargeType: 'Per Item' },
      { name: 'Postage - SA Post Office Rate', description: 'Postal delivery fee applied at prevailing South African Post Office rates.', price: 'R 6.30', chargeType: 'Rate' },
    ],
  },
  {
    id: '1.6',
    title: '1.6 Service Schedule J',
    subtitle: 'e-Services communication, payment facilitation, and support charges',
    color: 'tertiary',
    items: [
      { name: 'SMS Charge per Unit (Short Message Service, 160 Characters)', description: 'Per-message charge for transactional and customer communication through SMS.', price: 'R 0.30', chargeType: 'Per Message' },
      { name: 'MMS Charge per Unit (Multimedia Message Service, up to 3.5Mb)', description: 'Per-message multimedia communication cost where richer media is required.', price: 'R 2.25', chargeType: 'Per Message' },
      { name: 'Email Charge per Unit (Electronic Mail, up to 10Mb)', description: 'Per-email delivery charge for municipal outbound communication workflows.', price: 'R 0.12', chargeType: 'Per Message' },
      { name: 'WhatsApp Message per Unit (Messaging via Software Application)', description: 'Per-message cost for customer engagement via WhatsApp communication channels.', price: 'R 0.25', chargeType: 'Per Message' },
      { name: 'WhatsApp Message per Statement', description: 'Message charge applied per statement communication delivered via WhatsApp.', price: 'R 0.25', chargeType: 'Per Message' },
      { name: 'Transaction Fee (per transaction, all transactions)', description: 'Payment facilitation percentage fee applied to each processed transaction.', price: '6%', chargeType: 'Percentage' },
      { name: 'Prepaid Vending Fee (per transaction, all transactions)', description: 'Percentage fee for prepaid vending transaction processing and settlement support.', price: '6%', chargeType: 'Percentage' },
      { name: 'Settlement Fee (per settlement)', description: 'Charge applied when funds are settled between payment channels and municipal accounts.', price: 'R 8.50', chargeType: 'Per Transaction' },
      { name: 'Chargeback Fee (per fraudulent transaction)', description: 'Investigation and reversal handling fee for fraudulent or disputed transactions.', price: 'R 150.00', chargeType: 'Per Transaction' },
      { name: 'Refund Fee (per refund)', description: 'Administrative and processing fee for managed customer refund transactions.', price: 'R 2.50', chargeType: 'Per Transaction' },
      { name: 'Support Rate (per hour, marketing specialist) out of scope', description: 'Hourly out-of-scope specialist support for campaign, outreach, and communication assistance.', price: 'R 950.00', chargeType: 'Hourly' },
    ],
  },
];

interface CatalogItem extends PricingItem {
  sectionId: string;
  sectionTitle: string;
  sectionSubtitle: string;
  color: 'primary' | 'secondary' | 'tertiary';
}

type SortField = 'name' | 'section' | 'price';
type SortDirection = 'asc' | 'desc';

const getCardIcon = (chargeType: ChargeType) => {
  switch (chargeType) {
    case 'Hourly':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6l4 2" />
        </svg>
      );
    case 'Percentage':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="5" y1="19" x2="19" y2="5" />
          <circle cx="7.5" cy="7.5" r="2.5" />
          <circle cx="16.5" cy="16.5" r="2.5" />
        </svg>
      );
    case 'Per Transaction':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 7h18M3 12h12M3 17h8" />
          <rect x="2.5" y="4" width="19" height="16" rx="2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M7 9h10M7 13h6" />
        </svg>
      );
  }
};

const Pricing = () => {
  const introAnim = useScrollAnimation();
  const gridAnim = useScrollAnimation(0.05);
  const [search, setSearch] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [selectedChargeType, setSelectedChargeType] = useState('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const allItems = useMemo<CatalogItem[]>(() => {
    return pricingSections.flatMap((section) =>
      section.items.map((item) => ({
        ...item,
        sectionId: section.id,
        sectionTitle: section.title,
        sectionSubtitle: section.subtitle,
        color: section.color,
      })),
    );
  }, []);

  const chargeTypeOptions = useMemo(() => {
    return Array.from(new Set(allItems.map((item) => item.chargeType))).sort();
  }, [allItems]);

  const parsePriceForSort = (price: string): number => {
    if (price.toLowerCase().includes('request')) return Number.POSITIVE_INFINITY;
    if (price.includes('%')) return parseFloat(price.replace('%', '').trim());
    return parseFloat(price.replace(/[^0-9.]/g, '')) || Number.POSITIVE_INFINITY;
  };

  const filteredAndSortedItems = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    const filtered = allItems.filter((item) => {
      const matchesSearch =
        searchTerm.length === 0 ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.sectionTitle.toLowerCase().includes(searchTerm);

      const matchesSection = selectedSection === 'all' || item.sectionId === selectedSection;
      const matchesChargeType = selectedChargeType === 'all' || item.chargeType === selectedChargeType;

      return matchesSearch && matchesSection && matchesChargeType;
    });

    const sorted = [...filtered].sort((a, b) => {
      let compareResult = 0;

      if (sortField === 'name') {
        compareResult = a.name.localeCompare(b.name);
      } else if (sortField === 'section') {
        compareResult = a.sectionId.localeCompare(b.sectionId, undefined, { numeric: true });
      } else if (sortField === 'price') {
        compareResult = parsePriceForSort(a.price) - parsePriceForSort(b.price);
      }

      return sortDirection === 'asc' ? compareResult : -compareResult;
    });

    return sorted;
  }, [allItems, search, selectedSection, selectedChargeType, sortField, sortDirection]);

  return (
    <div className={styles.pricing}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div ref={introAnim.ref} className={`${styles.heroContent} ${introAnim.isVisible ? styles.visible : ''}`}>
          <h1>Pricing Catalog</h1>
          <p>
            Product and service pricing from the 2026 variable and communication schedules (sections 1.1 to 1.6),
            presented as a modern catalog for quick comparison.
          </p>
          <span className={styles.note}>All prices are listed in South African Rand (ZAR).</span>
        </div>
      </section>

      <section className={styles.catalog}>
        <div ref={gridAnim.ref} className={`${styles.sectionWrap} ${gridAnim.isVisible ? styles.visible : ''}`}>
          <div className={styles.controls}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search product, description, or section..."
              className={styles.searchInput}
            />

            <select
              value={selectedSection}
              onChange={(event) => setSelectedSection(event.target.value)}
              className={styles.select}
            >
              <option value="all">All Sections</option>
              {pricingSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.id}
                </option>
              ))}
            </select>

            <select
              value={selectedChargeType}
              onChange={(event) => setSelectedChargeType(event.target.value)}
              className={styles.select}
            >
              <option value="all">All Charge Types</option>
              {chargeTypeOptions.map((chargeType) => (
                <option key={chargeType} value={chargeType}>
                  {chargeType}
                </option>
              ))}
            </select>

            <select
              value={sortField}
              onChange={(event) => setSortField(event.target.value as SortField)}
              className={styles.select}
            >
              <option value="name">Sort by Name</option>
              <option value="section">Sort by Section</option>
              <option value="price">Sort by Price</option>
            </select>

            <select
              value={sortDirection}
              onChange={(event) => setSortDirection(event.target.value as SortDirection)}
              className={styles.select}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className={styles.resultCount}>{filteredAndSortedItems.length} catalog items</div>

          <div className={styles.cardGrid}>
            {filteredAndSortedItems.map((item, index) => (
              <article key={`${item.sectionId}-${index}-${item.name}`} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={`${styles.cardIcon} ${styles[item.color]}`}>{getCardIcon(item.chargeType)}</div>
                  <div className={styles.sectionTag}>{item.sectionId}</div>
                </div>
                <div className={styles.cardBody}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.sectionContext}>
                  <strong>{item.sectionTitle}</strong>
                  <span>{item.sectionSubtitle}</span>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.chargeType}>{item.chargeType}</span>
                  <span className={styles.price}>{item.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
