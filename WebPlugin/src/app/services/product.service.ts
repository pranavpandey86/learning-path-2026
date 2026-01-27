import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly products: Product[] = [
        {
            id: 1,
            name: 'Remote Office Travel ID - S0011 - Create / Modify',
            description: 'The Remote Office Travel ID product is an temporary solution for Citi employees traveling to remote locations.',
            price: 0,
            image: 'assets/products/headphones_1769364775116.png',
            category: 'Identity',
            deliveryDays: 0
        },
        {
            id: 2,
            name: 'BYOD Mobile Token',
            description: 'Mobile Token 2.0 for BYOD is an alternative to a Safeword card. One time passcodes are generated directly from your device.',
            price: 0,
            image: 'assets/products/laptop_1769364788924.png',
            category: 'Computers',
            deliveryDays: 2
        },
        {
            id: 3,
            name: 'Bring Your Own Device (BYOD) Applications',
            description: 'Over 80% of mobile users prefer to use their personal devices. This product allows you to access corporate apps securely.',
            price: 0,
            image: 'assets/products/mouse_1769364802377.png',
            category: 'Peripherals',
            deliveryDays: 2
        },
        {
            id: 4,
            name: 'Zoom@Citi Account Request',
            description: 'Zoom is Citi\'s strategic solution for meetings, providing an intuitive, video-first solution for collaboration.',
            price: 0,
            image: 'assets/products/keyboard_1769364815812.png',
            category: 'Peripherals',
            deliveryDays: 1
        },
        {
            id: 5,
            name: 'Desktop Software Request',
            description: 'How to complete a request for Desktop Software Request - video is located on the Support Tab for your reference.',
            price: 0,
            image: 'assets/products/monitor_1769364837212.png',
            category: 'Displays',
            deliveryDays: 11
        },
        {
            id: 6,
            name: 'AD Management - Group Membership/Automated Shared Directory Access (ASDA)',
            description: 'Add or remove Application / DB / Shared Directory access for users in your organization.',
            price: 0,
            image: 'assets/products/webcam_1769364851070.png',
            category: 'Video',
            deliveryDays: 18
        },
        {
            id: 7,
            name: 'MS Office Macro Enable/Disable',
            description: 'This product allows users to submit request to enable/disable use of Macros in Microsoft Office applications.',
            price: 0,
            image: 'assets/products/speakers_1769364863428.png',
            category: 'Audio',
            deliveryDays: 1
        },
        {
            id: 8,
            name: 'BYOD Quick Reactivation',
            description: 'This product will allow you to request a QR Code to activate BlackBerry UEM Client on any supported device.',
            price: 0,
            image: 'assets/products/controller_1769364878161.png',
            category: 'Gaming',
            deliveryDays: 1
        },
        {
            id: 9,
            name: 'VPN Access Request',
            description: 'Request VPN access for secure remote connectivity to corporate network resources.',
            price: 0,
            image: 'assets/products/usb_hub_1769364906354.png',
            category: 'Accessories',
            deliveryDays: 3
        },
        {
            id: 10,
            name: 'Cloud Storage Quota Increase',
            description: 'Request additional storage quota for OneDrive or SharePoint cloud storage services.',
            price: 0,
            image: 'assets/products/ssd_1769364921148.png',
            category: 'Storage',
            deliveryDays: 2
        },
        {
            id: 11,
            name: 'Developer Tools Package',
            description: 'Request development environment setup including IDE, version control, and build tools.',
            price: 0,
            image: 'assets/products/laptop_stand_1769364935317.png',
            category: 'Development',
            deliveryDays: 5
        },
        {
            id: 12,
            name: 'Security Token Replacement',
            description: 'Request replacement of physical security token for two-factor authentication.',
            price: 0,
            image: 'assets/products/desk_lamp_1769364948202.png',
            category: 'Security',
            deliveryDays: 7
        },
        {
            id: 13,
            name: 'Email Distribution List Creation',
            description: 'Request creation of new email distribution list for team or project communication.',
            price: 0,
            image: 'assets/products/wireless_charger_1769364971231.png',
            category: 'Communication',
            deliveryDays: 1
        },
        {
            id: 14,
            name: 'Conference Room Equipment',
            description: 'Request audio/video equipment setup for conference rooms and meeting spaces.',
            price: 0,
            image: 'assets/products/earbuds_1769364984254.png',
            category: 'Audio',
            deliveryDays: 14
        },
        {
            id: 15,
            name: 'Database Access Request',
            description: 'Request read/write access to production or development database environments.',
            price: 0,
            image: 'assets/products/drawing_tablet_1769364998734.png',
            category: 'Data',
            deliveryDays: 5
        },
        {
            id: 16,
            name: 'API Gateway Access',
            description: 'Request API key and access credentials for internal API gateway services.',
            price: 0,
            image: 'assets/products/microphone_1769365011208.png',
            category: 'Integration',
            deliveryDays: 3
        }
    ];

    // This URL can be overridden when the widget is configured
    private apiBaseUrl: string = '';

    setApiBaseUrl(url: string): void {
        this.apiBaseUrl = url;
    }

    getProducts(): Observable<Product[]> {
        // For now, return mock data
        // Later, this will call: `${this.apiBaseUrl}/api/products`
        return of(this.products).pipe(delay(100));
    }

    getProductById(id: number): Observable<Product | undefined> {
        return of(this.products.find(p => p.id === id)).pipe(delay(50));
    }

    getProductsPaginated(page: number, pageSize: number): Observable<{ products: Product[], total: number }> {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedProducts = this.products.slice(start, end);

        return of({
            products: paginatedProducts,
            total: this.products.length
        }).pipe(delay(100));
    }
}
