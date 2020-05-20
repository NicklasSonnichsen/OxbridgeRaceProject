using Plugin.Geolocator;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms.Maps;

namespace OxbridgeRaceMobileApp.ViewModel
{
    public class MapViewModel : BaseViewModel
    {
        public MapViewModel()
        {
            Map = new Map();

            GetCurrentLocation();
        }

        public Map Map { get; private set; }

        private async void GetCurrentLocation()
        {
            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 1;
            var position = await locator.GetPositionAsync(TimeSpan.FromSeconds(0.01));
            Map.MoveToRegion(MapSpan.FromCenterAndRadius(new Position(position.Latitude, position.Longitude),
                                                         Distance.FromKilometers(0.2)));
        }
    }
}
