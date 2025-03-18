import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisitedLocationsService {
  private storageKey = 'visitedLocations';

  constructor() {
    // Check if there is any data in localStorage and load it
    const storedLocations = localStorage.getItem(this.storageKey);
    if (storedLocations) {
      this.visitedLocations = JSON.parse(storedLocations);
    }
  }

  private visitedLocations: string[] = [];

  addLocation(locationName: string) {
    if (!this.visitedLocations.includes(locationName)) {
      this.visitedLocations.push(locationName);
      // Save updated locations to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(this.visitedLocations));
    }
  }

  getLocations(): string[] {
    return this.visitedLocations;
  }
}
