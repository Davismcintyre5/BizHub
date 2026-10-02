import type { ComponentType } from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  BarChart3,
  Menu,
  Monitor,
  Users,
  Zap,
  Wrench,
  Pill,
  Stethoscope,
  UtensilsCrossed,
  ClipboardList,
  Building2,
  FileText,
  DollarSign,
} from 'lucide-react-native';
import type { Vertical } from '@/types';

export interface VerticalTab {
  name: string;
  label: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  component: ComponentType<object>;
  badgeKey?: string;
}

export interface VerticalConfig {
  tabs: VerticalTab[];
}

import { PharmaDashboardScreen } from '@/screens/pharma/DashboardScreen';
import { PharmaSalesStack } from '@/screens/pharma/sales/PharmaSalesStack';
import { PharmaManageStack } from '@/screens/pharma/inventory/PharmaManageStack';
import { PharmaReportsStack } from '@/screens/pharma/reports/PharmaReportsStack';

import { CyberDashboardScreen } from '@/screens/cyber/DashboardScreen';
import { CyberPosStack } from '@/screens/cyber/pos/CyberPosStack';
import { CyberManageStack } from '@/screens/cyber/sessions/CyberManageStack';
import { CyberReportsStack } from '@/screens/cyber/reports/CyberReportsStack';

import { ElectroDashboardScreen } from '@/screens/electro/DashboardScreen';
import { ElectroSalesStack } from '@/screens/electro/sales/ElectroSalesStack';
import { ElectroManageStack } from '@/screens/electro/inventory/ElectroManageStack';
import { ElectroReportsStack } from '@/screens/electro/reports/ElectroReportsStack';

import { ApartmentDashboardScreen } from '@/screens/apartment/DashboardScreen';
import { ApartmentPaymentsStack } from '@/screens/apartment/payments/ApartmentPaymentsStack';
import { ApartmentManageStack } from '@/screens/apartment/tenants/ApartmentManageStack';
import { ApartmentReportsStack } from '@/screens/apartment/reports/ApartmentReportsStack';

import { RestoDashboardScreen } from '@/screens/resto/DashboardScreen';
import { RestoOrdersStack } from '@/screens/resto/orders/RestoOrdersStack';
import { RestoManageStack } from '@/screens/resto/menu/RestoManageStack';
import { RestoReportsStack } from '@/screens/resto/reports/RestoReportsStack';

import { DashboardStack } from './DashboardStack';
import { MoreStack } from './MoreStack';

export const verticalConfigs: Record<Vertical, VerticalConfig> = {
  pharma: {
    tabs: [
      { name: 'Dashboard', label: 'Home', icon: Home, component: DashboardStack },
      {
        name: 'Core',
        label: 'Sales',
        icon: ShoppingCart,
        component: PharmaSalesStack,
      },
      {
        name: 'Manage',
        label: 'Inventory',
        icon: Package,
        component: PharmaManageStack,
      },
      {
        name: 'Reports',
        label: 'Reports',
        icon: BarChart3,
        component: PharmaReportsStack,
      },
      { name: 'More', label: 'More', icon: Menu, component: MoreStack },
    ],
  },

  cyber: {
    tabs: [
      { name: 'Dashboard', label: 'Home', icon: Home, component: DashboardStack },
      {
        name: 'Core',
        label: 'POS',
        icon: Monitor,
        component: CyberPosStack,
      },
      {
        name: 'Manage',
        label: 'Sessions',
        icon: Users,
        component: CyberManageStack,
      },
      {
        name: 'Reports',
        label: 'Reports',
        icon: BarChart3,
        component: CyberReportsStack,
      },
      { name: 'More', label: 'More', icon: Menu, component: MoreStack },
    ],
  },

  electro: {
    tabs: [
      { name: 'Dashboard', label: 'Home', icon: Home, component: DashboardStack },
      {
        name: 'Core',
        label: 'Sales',
        icon: Zap,
        component: ElectroSalesStack,
      },
      {
        name: 'Manage',
        label: 'Inventory',
        icon: Wrench,
        component: ElectroManageStack,
      },
      {
        name: 'Reports',
        label: 'Reports',
        icon: BarChart3,
        component: ElectroReportsStack,
      },
      { name: 'More', label: 'More', icon: Menu, component: MoreStack },
    ],
  },

  apartment: {
    tabs: [
      { name: 'Dashboard', label: 'Home', icon: Home, component: DashboardStack },
      {
        name: 'Core',
        label: 'Payments',
        icon: DollarSign,
        component: ApartmentPaymentsStack,
      },
      {
        name: 'Manage',
        label: 'Tenants',
        icon: Building2,
        component: ApartmentManageStack,
      },
      {
        name: 'Reports',
        label: 'Reports',
        icon: FileText,
        component: ApartmentReportsStack,
      },
      { name: 'More', label: 'More', icon: Menu, component: MoreStack },
    ],
  },

  resto: {
    tabs: [
      { name: 'Dashboard', label: 'Home', icon: Home, component: DashboardStack },
      {
        name: 'Core',
        label: 'Orders',
        icon: UtensilsCrossed,
        component: RestoOrdersStack,
      },
      {
        name: 'Manage',
        label: 'Menu',
        icon: ClipboardList,
        component: RestoManageStack,
      },
      {
        name: 'Reports',
        label: 'Reports',
        icon: BarChart3,
        component: RestoReportsStack,
      },
      { name: 'More', label: 'More', icon: Menu, component: MoreStack },
    ],
  },
};

export const verticalIcons: Record<Vertical, ComponentType<{ size?: number; color?: string }>> = {
  pharma: Pill,
  cyber: Monitor,
  electro: Zap,
  apartment: Building2,
  resto: UtensilsCrossed,
};

export const verticalSecondaryIcons: Record<
  Vertical,
  ComponentType<{ size?: number; color?: string }>
> = {
  pharma: Stethoscope,
  cyber: Users,
  electro: Wrench,
  apartment: FileText,
  resto: ClipboardList,
};