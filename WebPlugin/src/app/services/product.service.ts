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
            name: 'Wireless Headphones',
            description: 'Premium noise-canceling wireless headphones with 30-hour battery life and exceptional sound quality.',
            price: 299.99,
            image: 'assets/products/headphones_1769364775116.png',
            category: 'Audio'
        },
        {
            id: 2,
            name: 'Gaming Laptop',
            description: 'High-performance gaming laptop with RTX 4070, 16GB RAM, and 1TB NVMe SSD.',
            price: 1599.99,
            image: 'assets/products/laptop_1769364788924.png',
            category: 'Computers'
        },
        {
            id: 3,
            name: 'Ergonomic Mouse',
            description: 'Wireless ergonomic mouse designed for comfort during long work sessions.',
            price: 79.99,
            image: 'assets/products/mouse_1769364802377.png',
            category: 'Peripherals'
        },
        {
            id: 4,
            name: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with Cherry MX switches and programmable keys.',
            price: 149.99,
            image: 'assets/products/keyboard_1769364815812.png',
            category: 'Peripherals'
        },
        {
            id: 5,
            name: '4K UltraWide Monitor',
            description: '34-inch curved 4K monitor with HDR support and 144Hz refresh rate.',
            price: 699.99,
            image: 'assets/products/monitor_1769364837212.png',
            category: 'Displays'
        },
        {
            id: 6,
            name: 'HD Webcam',
            description: '1080p webcam with auto-focus, built-in microphone, and low-light correction.',
            price: 89.99,
            image: 'assets/products/webcam_1769364851070.png',
            category: 'Video'
        },
        {
            id: 7,
            name: 'Desktop Speakers',
            description: 'Powerful 2.1 speaker system with subwoofer and Bluetooth connectivity.',
            price: 179.99,
            image: 'assets/products/speakers_1769364863428.png',
            category: 'Audio'
        },
        {
            id: 8,
            name: 'Game Controller',
            description: 'Wireless game controller compatible with PC, Xbox, and mobile devices.',
            price: 69.99,
            image: 'assets/products/controller_1769364878161.png',
            category: 'Gaming'
        },
        {
            id: 9,
            name: 'USB-C Hub',
            description: '10-in-1 USB-C hub with HDMI, SD card reader, and 100W power delivery.',
            price: 59.99,
            image: 'assets/products/usb_hub_1769364906354.png',
            category: 'Accessories'
        },
        {
            id: 10,
            name: 'External SSD',
            description: '2TB portable SSD with USB 3.2 Gen 2 for ultra-fast file transfers.',
            price: 199.99,
            image: 'assets/products/ssd_1769364921148.png',
            category: 'Storage'
        },
        {
            id: 11,
            name: 'Laptop Stand',
            description: 'Adjustable aluminum laptop stand with improved airflow and ergonomic angles.',
            price: 49.99,
            image: 'assets/products/laptop_stand_1769364935317.png',
            category: 'Accessories'
        },
        {
            id: 12,
            name: 'LED Desk Lamp',
            description: 'Smart LED desk lamp with adjustable color temperature and brightness.',
            price: 59.99,
            image: 'assets/products/desk_lamp_1769364948202.png',
            category: 'Accessories'
        },
        {
            id: 13,
            name: 'Wireless Charger',
            description: '15W fast wireless charging pad compatible with all Qi-enabled devices.',
            price: 39.99,
            image: 'assets/products/wireless_charger_1769364971231.png',
            category: 'Power'
        },
        {
            id: 14,
            name: 'Noise-Canceling Earbuds',
            description: 'True wireless earbuds with active noise cancellation and 8-hour battery.',
            price: 199.99,
            image: 'assets/products/earbuds_1769364984254.png',
            category: 'Audio'
        },
        {
            id: 15,
            name: 'Drawing Tablet',
            description: 'Professional drawing tablet with 8192 pressure levels and tilt support.',
            price: 249.99,
            image: 'assets/products/drawing_tablet_1769364998734.png',
            category: 'Creative'
        },
        {
            id: 16,
            name: 'Streaming Microphone',
            description: 'USB condenser microphone with cardioid pattern and real-time monitoring.',
            price: 129.99,
            image: 'assets/products/microphone_1769365011208.png',
            category: 'Audio'
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
